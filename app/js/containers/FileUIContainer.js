import React from 'react';
import UploadFileForm from '../components/UploadFileForm';

class FileUIContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	
	render() {
		return this.props.fileLoaded
		? (
			<div>
				<UploadFileForm 
					handleFile={this.props.handleCSVInput} 
					helpText="" />
				{/*
				<button onClick={this.props.handleExportClick}>
					export results
				</button>
				*/}
			</div>
			)
		: (
			<div >
				<UploadFileForm 
					handleFile={this.props.handleCSVInput}
					helpText="ex: RadGridExport.csv"/>
			</div>
		);
	}
}

export default FileUIContainer;