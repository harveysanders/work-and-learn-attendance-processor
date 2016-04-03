import React from 'react';
import _ from 'underscore';

import ResultsTableRow from '../components/ResultsTableRow'
import ResultsTableHeader from '../components/ResultsTableHeader'

//TODO: figure out how to get headers to stay in order
//TODO: add sort dropdown box or clickable headers

class ResultsContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sortBy: 'participantName' //'cohort'
		};
		this.handleHeaderClick = this.handleHeaderClick.bind(this);
	}

	handleHeaderClick(e) {
		e.preventDefault();
		console.log('header click', e.target.innerHtml);

	}
	render() {
		// let headers = [];
		// for (let prop in this.props.results[0]) {
		// 	headers.push(<ResultsTableHeader header={prop} key={prop} />)
		// }
		let participants = _.sortBy(this.props.results, this.state.sortBy).map( (participant, i) =>
			(<ResultsTableRow 
					name={participant.participantName} 
					totalCredits={participant.totalCredits}
					cohort={participant.cohort}
					key={i}
					index={i}
				/>
			)
		);

		return !this.props.fileLoaded 
		? <div>
			<p>Please load a .csv file to process data.</p>
		</div>
		: (
			<table className="table table-hover table-condensed table-striped">
				<thead>
					<tr>
						<th>#</th>
						<th onClick={this.handleHeaderClick}>
							Participant Name
						</th>
						<th onClick={this.handleHeaderClick}>
							Cohort
						</th>
						<th onClick={this.handleHeaderClick}>
							Total Credits
						</th>
					</tr>
				</thead>
				<tbody>
					{participants}
				</tbody>
			</table>
		)
	}
}

export default ResultsContainer;