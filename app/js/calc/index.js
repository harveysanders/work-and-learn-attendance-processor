import _ from 'underscore';
import utils from '../utils';

let calc = {} 

function getNames(attendence){
	// console.log(attendence[1]);
  let names = []
  attendence.forEach(entry => {
    if (_.pluck(names, 'participantName').indexOf(entry.subjectName) === -1 && entry.subjectName) {
      names.push({
      	participantName:entry.subjectName,
      	cohort: entry.wLComponent
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

  // console.log(_.zip(names, totals));

  let results = _.zip(names, totals).map(el => {
    return Object.assign(
    	el[0], 
    	{totalCredits: el[1]}
  	)
  });
  return results;
}

export default calc;