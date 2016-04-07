import React from 'react';
import _ from 'underscore';
import calc from '../calc';

import ResultsTableRow from '../components/ResultsTableRow';
import ResultsTableHeader from '../components/ResultsTableHeader';
import NoFileWarning from '../components/NoFileWarning';
// import ShowAllDataCheckbox from '..components/ShowAllDataCheckbox'

//TODO: figure out how to get headers to stay in order
//TODO: ability to click on participants and get all entries 

class ResultsContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sortBy: 'participantName',
			reverseSort: false,
			showAllData: false,
			filterText: ''
		};
		this.handleHeaderClick = this.handleHeaderClick.bind(this);
		this.handleShowAllClick = this.handleShowAllClick.bind(this);
		this.handleSearchInput = this.handleSearchInput.bind(this);
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
			{showAllData: !this.state.showAllData}
		);
	}

	handleSearchInput(e) {
		this.setState({
			filterText: e.target.value
		});
	}
	render() {
		let dateRange = calc.getDateRange(this.props.results);
		let participants = _.sortBy(calc.getStipendsWithDetails(this.props.results).filter(participant => {
			return participant.participantName.toLowerCase().indexOf(this.state.filterText.toLowerCase()) !== -1;
		}) , this.state.sortBy).map( (participant, i) =>
			(<ResultsTableRow 
					name={participant.participantName} 
					totalCredits={participant.totalCredits}
					cohort={participant.cohort}
					key={participant.subjectID}
					index={i}
					id={participant.subjectID}
					attendanceEntries={participant.entries}
				/>
			)
		);

		if (this.state.reverseSort) {participants.reverse();}

		return !this.props.fileLoaded 
		? <NoFileWarning />
		: (
			<div >

				<div className="col-md-2 text-right">
			  	<label className="label label-default">
			  		Pay period: {dateRange.earliest} - {dateRange.latest}
			  	</label>
				</div>

				<div className="col-md-10">

					<form role="form" className="form-inline">
						<div className="form-group">
							<input 
								type="text" 
								className="form-control" 
								id="searchInput" 
								placeholder="Search Participants"
								onChange={this.handleSearchInput}/>
						</div>
					</form>

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
							{participants.length === 0 ? 'No results found.' : participants}
						</tbody>
					</table>
				</div>

			</div>
		)
	}
}

export default ResultsContainer;