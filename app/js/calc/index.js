import _ from 'underscore';
import utils from '../utils';
import moment from 'moment';

let calc = {} 

function getNames(attendence){
  let names = []
  attendence.forEach(entry => {
    if (_.pluck(names, 'participantName').indexOf(entry.subjectName) === -1 && entry.subjectName) {
      names.push({
      	participantName: entry.subjectName,
      	cohort: entry.wLComponent,
        subjectID: entry.subjectID
      });
    };
  });
  return names;
}

calc.getStipends = attendence => {
  let names = getNames(attendence);

  let totals = names.map(name => {
  	//for each participant
    return attendence.filter(entry => {
    	//grab only entries for current participant
      return name.participantName === entry.subjectName;
    }).map(entry => {
    	//get totalCredits for each entry and round to nearest 0.5
      return utils.roundDownToHalf(Number(entry.totalDailyCredits));
    }).reduce((sum, credits) => {
    	//sum all of total daily credits
      return sum + credits;
    },0)
  });

  let results = _.zip(names, totals).map(el => {
    return Object.assign(
    	el[0], 
    	{totalCredits: el[1]}
  	)
  });
  return results;
}

calc.getDateRange = attendence => {
  let dates = attendence.map(entry => {
    return moment(entry.responseDate, "M/D/YYYY");
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
  }
}

export default calc;