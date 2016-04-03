import React from 'react';
import UploadFileForm from '../components/UploadFileForm';
import ResultsContainer from '../containers/ResultsContainer';
import _ from 'underscore';
import Papa from 'papaparse';

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
    if (names.indexOf(entry.subjectName) === -1) {
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
      return Number(entry.totalDailyCredits);
    }).reduce((sum, credits) => {
      return sum + credits;
    },0)
  });

  let results = _.zip(names, totals).map(el => {
    let obj = {
    	participantName: el[0],
    	totalCredits: el[1]
    };
    return obj;
  });
  return results;

}

//ETO data formatting helpers

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
}

function cleanEtoData(etoData) {
  return etoData.map(function(obj){
    var newObj = {};
    for (var prop in obj) {
      newObj[camelize(prop).replace(/:/g, '')] = obj[prop];
    };
    return newObj;
  });
}

class AppContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			results: [{participantName: "Doe, John ", totalCredits:6.2}],
			fileLoaded: true
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
		    	results: getStipends(cleanEtoData(results.data)),
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