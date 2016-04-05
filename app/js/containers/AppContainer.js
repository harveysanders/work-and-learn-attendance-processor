import React from 'react';
import UploadFileForm from '../components/UploadFileForm';
import ResultsContainer from '../containers/ResultsContainer';
import Papa from 'papaparse';
import utils from '../utils';

/*
TODO: add calculation button or checkbox to show all unfiltered data
*/

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
		    	results: utils.cleanEtoData(results.data),
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
					<ResultsContainer 
						results={this.state.results}
						fileLoaded={this.state.fileLoaded} />
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