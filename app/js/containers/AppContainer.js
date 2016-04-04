import React from 'react';
import UploadFileForm from '../components/UploadFileForm';
import ResultsContainer from '../containers/ResultsContainer';
import _ from 'underscore';
import Papa from 'papaparse';
import utils from '../utils';

/*
TODO: add calculation button or checkbox to show all unfiltered data
*/

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

function getStipends(attendence) {
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


class AppContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			results: [{participantName: "Doe, John ", totalCredits:6.2}],
			fileLoaded: false
		};
		this.handleCSVInput = this.handleCSVInput.bind(this);
	}
	handleCSVInput(e) {
		Papa.parse(e.target.files[0], {
		  header: true,
		  error: (error, file) => {
		    console.error('error: ', error);
		  },
		  complete: (results, file) => {
		    this.setState({
		    	results: getStipends(utils.cleanEtoData(results.data)),
		    	fileLoaded: true
		    })
		  }
		})
	}
	render() {
		return (
			<div className="container-fluid">
				<div className='row'>
					<div className='col-md-6 col-md-offset-3'>
						<h3>Work & Learn Attendence Processor</h3>
						<UploadFileForm handleFile={this.handleCSVInput}/>
					</div>
				</div>
				<div className="row">
					<ResultsContainer results={this.state.results} fileLoaded={this.state.fileLoaded} />
				</div>

			</div>
		)
	}
}

AppContainer.propTypes = {
	results: React.PropTypes.array,
	handleFile: React.PropTypes.func
};


export default AppContainer;