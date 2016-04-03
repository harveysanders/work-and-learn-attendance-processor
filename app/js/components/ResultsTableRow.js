import React from 'react';

const ResultsTableRow = ({name, cohort, totalCredits, index}) => (
	<tr>
		<td>
			{index + 1}
		</td>
		<td>
			{name}
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