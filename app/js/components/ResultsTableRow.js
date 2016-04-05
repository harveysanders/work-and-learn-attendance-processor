import React from 'react';

const ResultsTableRow = ({
	name, 
	cohort,
	totalCredits,
	index,
	id,
	handleNameClick
}) => (
	<tr >
		<td>
			{index + 1}
		</td>
		<td>
			<a 
				id={id}
				href="#" 
				onClick={handleNameClick}>
				{name}
			</a>
		</td>
		<td>
			{cohort}
		</td>
		<td>
			{totalCredits}
		</td>
	</tr>
)

export default ResultsTableRow;