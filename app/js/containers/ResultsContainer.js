import React from 'react';
import _ from 'underscore';
import calc from '../calc';

import ResultsTableRow from '../components/ResultsTableRow';
import CollapsibleRow from '../components/CollapsibleRow';
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
			showAllData: false
		};
		this.handleHeaderClick = this.handleHeaderClick.bind(this);
		this.handleShowAllClick = this.handleShowAllClick.bind(this);
		this.handleNameClick = this.handleNameClick.bind(this);
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
	handleNameClick(e) {
		console.log('click', e.target.id)
	}

	render() {
		let dateRange = calc.getDateRange(this.props.results);
		let participants = _.sortBy(calc.getStipendsWithDetails(this.props.results), this.state.sortBy).map( (participant, i) =>
			(<ResultsTableRow 
					name={participant.participantName} 
					totalCredits={participant.totalCredits}
					cohort={participant.cohort}
					key={participant.subjectID}
					index={i}
					id={participant.subjectID}
					handleNameClick={this.handleNameClick}
					moreDetails={this.moreDetails}
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