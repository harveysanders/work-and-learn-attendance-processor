import _ from 'underscore';
import utils from '../utils';
import moment from 'moment';

let calc = {};

function getParticipants(attendence){
	let participants = [];
	attendence.forEach(entry => {
		if (_.pluck(participants, 'participantName').indexOf(entry.subjectName) === -1 && entry.subjectName) {
			participants.push({
				participantName: entry.subjectName,
				cohort: entry.wLComponent,
				subjectID: entry.subjectID
			});
		}
	});
	return participants;
}

calc.getDateRange = attendence => {
	let dates = attendence.map(entry => {
		return moment(entry.responseDate, 'M/D/YYYY');
	}).filter(date => {
		return date.format() !== 'Invalid date';
	});

	return {
		earliest: dates.length 
			? dates.reduce((earliest, date) => {
				return earliest.isBefore(date) ? earliest : date;
			}).format('dddd, MM/DD/YYYY' )
			: null,
		latest: dates.length 
			? dates.reduce((latest, date) => {
				return latest.isAfter(date) ? latest : date;
			}).format('dddd, MM/DD/YYYY' )
			: null
	};
};

calc.getStipendsWithDetails = attendence => {
	let participants = getParticipants(attendence);

	return participants.map(participant => {
		//for each participant
		let participantEntries = attendence.filter(entry => {
			//grab only entries for current participant
			return participant.participantName === entry.subjectName;
		});

		let totalCredits = participantEntries.map(entry => {
			//get totalCredits for each entry and round to nearest 0.5
			return utils.roundDownToHalf(Number(entry.totalDailyCredits));
		}).reduce((sum, credits) => {
			//sum all of total daily credits
			return sum + credits;
		},0);

		return Object.assign(
			participant,
			{entries: participantEntries},
			{totalCredits: totalCredits}
		);
	});
};

calc.removeBreakTime = (timeIn1, timeOut1, timeIn2, timeOut2) => {

	//12:00, 1:01, 1:53, 2:05 >> 12:00 - 1:13
	return [
		timeIn1,
		moment(timeOut1, 'h:mm').add(moment(timeOut2, 'h:mm').diff(moment(timeIn2, 'h:mm'), 'minutes'), 'minutes').format('HH:mm')  
	];
	
};

export default calc;