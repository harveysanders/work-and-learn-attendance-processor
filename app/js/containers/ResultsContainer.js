import React from 'react';
import ResultsTableRow from '../components/ResultsTableRow'
import ResultsTableHeader from '../components/ResultsTableHeader'

//TODO: figure out how to get headers to stay in order

class ResultsContainer extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		// let headers = [];
		// for (let prop in this.props.results[0]) {
		// 	headers.push(<ResultsTableHeader header={prop} key={prop} />)
		// }
		let participants = this.props.results.map(function(participant, i) {
			return (<ResultsTableRow 
					name={participant.participantName} 
					totalCredits={participant.totalCredits}
					key={i}
				/>
			)
		});

		return !this.props.fileLoaded 
		? <div>
			<p>Please load a .csv file to process data.</p>
		</div>
		: (
			<table className="table table-hover table-condensed table-striped">
				<thead>
					<tr>
						<th>Participant Name</th>
						<th>Total Credits</th>
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