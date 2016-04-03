import React from 'react';
import ResultsTableRow from '../components/ResultsTableRow'

class ResultsContainer extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let participants = this.props.results.map(function(participant) {
			for (let prop in participant) {
				return (<ResultsTableRow 
						name={prop} 
						totalCredits={participant[prop]}
						key={prop}
					/>
				)
			}
		});
		return (
			<table className="table table-hover table-condensed table-striped">
				<thead>
					<tr>
						<th>
							Participant Name
						</th>
						<th>
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