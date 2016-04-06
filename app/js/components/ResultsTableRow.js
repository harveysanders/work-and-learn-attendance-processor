import React from 'react';
import MoreDetailsModal from '../components/MoreDetailsModal';

const ResultsTableRow = ({
	name, 
	cohort,
	totalCredits,
	index,
	id,
	handleNameClick
}) => (
	<tr
		data-toggle="modal"
		data-target={id}
	>
		<td>
			{index + 1}
		</td>
		<td>
			<a href="#" 
				onClick={
					e => {
						e.stopPropagation();
						console.log('click', id);
						$('#'+id).modal('show');
					}
				}
			>
				{name}
			</a>
		</td>
		<td>
			{cohort}
		</td>
		<td>
			{totalCredits}
			<MoreDetailsModal targetID={id} />
		</td>
	</tr>
)

export default ResultsTableRow;