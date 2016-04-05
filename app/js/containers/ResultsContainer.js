import React from 'react';
import _ from 'underscore';
import calc from '../calc';

import ResultsTableRow from '../components/ResultsTableRow';
import ResultsTableHeader from '../components/ResultsTableHeader';
// import ShowAllDataCheckbox from '..components/ShowAllDataCheckbox'

//TODO: figure out how to get headers to stay in order
//TODO: show date range

class ResultsContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sortBy: 'participantName',
			reverseSort: false,
			showAllData: false
		};
		this.handleHeaderClick = this.handleHeaderClick.bind(this);
		// this.handleShowAllClick = this.handleShowAllClick.bind(this);
	}

	handleHeaderClick(sortBy) {
		if (this.state.sortBy === sortBy) {
			this.setState({
				reverseSort: !this.state.reverseSort
			});
		} else {
			this.setState({
				sortBy: sortBy
			});
		}
	}
	handleShowAllClick() {
		this.setState(
			{showAllData: !this.state.showAllData}, 
			this.handleCSVInput
		);
	}

	render() {
		// let headers = [];
		// for (let prop in this.props.results[0]) {
		// 	headers.push(<ResultsTableHeader header={prop} key={prop} />)
		// }
		let participants = _.sortBy(calc.getStipends(this.props.results), this.state.sortBy).map( (participant, i) =>
			(<ResultsTableRow 
					name={participant.participantName} 
					totalCredits={participant.totalCredits}
					cohort={participant.cohort}
					key={i}
					index={i}
				/>
			)
		);

		if (this.state.reverseSort) {participants.reverse();}

		return !this.props.fileLoaded 
		? <div className="alert alert-warning" role="alert">
				<span className="sr-only">Error:</span>
				Please load a .csv <a href="https://secure.etosoftware.com/" className="alert-link">ETO</a> report.
			</div>
		: (
			<div >
				<div className="col-md-2">
					<div className="checkbox">
					  <label className="checkbox-inline">
					  	<input 
					  		onClick={this.props.handleShowAllClick} 
					  		type="checkbox" /> 
					  		Show all unprocessed data
				  	</label>
					</div>
				</div>
				<div className="col-md-10">
					<table className="table table-hover table-condensed table-striped">
						<thead>
							<tr>
								<th>#</th>
								<th>
									<a href="#" onClick={this.handleHeaderClick.bind(this, 'participantName')}>
										Participant Name 
									</a>
								</th>
								<th>
									<a href="#" onClick={this.handleHeaderClick.bind(this, 'cohort')}>
										Cohort
									</a>
								</th>
								<th>
									<a href="#" onClick={this.handleHeaderClick.bind(this, 'totalCredits')}>
										Total Credits
									</a>
								</th>
							</tr>
						</thead>
						<tbody>
							{participants}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}

export default ResultsContainer;