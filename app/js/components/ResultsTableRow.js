import React from 'react';

const ResultsTableRow = ({name, totalCredits, index}) => (
	<tr>
		<td>
			{index + 1}
		</td>
		<td>
			{name}
		</td>
		<td>
			{totalCredits}
		</td>
	</tr>
)

export default ResultsTableRow;