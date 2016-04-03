import React from 'react';
import UploadFileForm from '../components/UploadFileForm';
import ResultsContainer from '../containers/ResultsContainer';
import _ from 'underscore';
import Papa from 'papaparse';

/*
TODO: change results objects to 
{
  particiantName: 'Adams, Jamie',
  totalCredits: 43
}
*/

const testResponseJSON = [{"Stewart, Gabriella ":123.9},{"Nelson, Devin ":53.1},{"Parker, Kevin":65.6},{"Parrila, Israel":100.4},{"Carr, Lakeya":55.7},{"Cobbins, Derrick":76},{"Cook, Jacarlus":57.5},{"Dumas, Kimberly":79.5},{"Jackson, Joshua":44.5},{"Lee, Trey ":74.7},{"Lucky, Vincent":94},{"Matthews, Percell":56.5},{"Milton, Taylor":122.5},{"Housey, Travis":34.8},{"Jefferson, Desean":15.8},{"Johnson, Jamie L.":50.8},{"Miles, Jazmine":52.1},{"Christmas, Evan ":72.9},{"Aldridge, Avery":126.2},{"Buckhalter, Levon ":78.8},{"Ranson, Michael":48.5},{"Variste, JoQuan":61.2},{"Ware, Cassius":45.7},{"Hulitt, Christopher R.":86.3},{"Stewart, Paul":80.2},{"Allen, Kiera":19},{"Brown, Alden":57},{"Fultz, Erica":37},{"Wiggins, Savoy":29},{"Charles, Darreonna ":69},{"Adams, Jamie":62.400000000000006},{"Stovall, Aaron":42},{"Robinson, DesJahnnay":54.5},{"Hansen, Roland":12.5},{"Warrick, James":19.2},{"Fenasci, Paul-Anthony":14},{"undefined":null}];

let parseConfig = {
    header: true,
    error: (error, file) => {
      console.error('error: ', error);
    },
    complete: (results, file) => {
      console.log('parsed:', results);
      getStipends(cleanEtoData(results.data));
    }
}

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
    let obj = {};
    obj[el[0]] = el[1];
    return obj;
  });
  console.log(results);
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
		this.handleCSVInput = this.handleCSVInput.bind(this);
	}
	handleCSVInput(e) {
		Papa.parse(e.target.files[0], parseConfig);
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
					<ResultsContainer results={this.props.results}/>
				</div>
			</div>
		)
	}
}

AppContainer.propTypes = {
	results: React.PropTypes.array,
	handleFile: React.PropTypes.func
};

AppContainer.defaultProps = {
	results: testResponseJSON
}

export default AppContainer;