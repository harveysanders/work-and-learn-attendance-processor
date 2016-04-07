import React from 'react';
import MoreDetailsModalContainer from '../containers/MoreDetailsModalContainer';

const ResultsTableRow = ({
	name, 
	cohort,
	totalCredits,
	index,
	id,
	handleNameClick,
	attendanceEntries
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
			<MoreDetailsModalContainer targetID={id} attendanceEntries={attendanceEntries}/>
		</td>
	</tr>
)

export default ResultsTableRow;