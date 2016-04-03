import React from 'react';
import UploadFileForm from '../components/UploadFileForm';
import ResultsContainer from '../containers/ResultsContainer';
import _ from 'underscore';
import Papa from 'papaparse';
import utils from '../utils';

/*
TODO: change results objects to 
{
  participantName: 'Adams, Jamie',
  totalCredits: 43
}
*/

function getNames(attendence){
  var names = []
  attendence.forEach(entry => {
    if (names.indexOf(entry.subjectName) === -1 && entry.subjectName) {
      names.push(entry.subjectName);
    };
  });
  return names;
}

function getStipends(attendence) {
  var names = getNames(attendence);

  var totals = names.map(name => {
    return attendence.filter(entry => {
      return name === entry.subjectName;
    }).map(entry => {
      return utils.roundDownToHalf(Number(entry.totalDailyCredits));
    }).reduce((sum, credits) => {
      return sum + credits;
    },0)
  });

  console.log();

  let results = _.zip(names, totals).map(el => {
    return {
    	participantName: el[0],
    	totalCredits: el[1]
    };
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
				<h3>Work & Learn Attendence Processor</h3>
				<div className='row'>
					<div className='col-md-12'>
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