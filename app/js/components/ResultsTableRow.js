import React from 'react';

const ResultsTableRow = ({name, totalCredits}) => (
	<tr>
		<td>
			{name}
		</td>
		<td>
			{totalCredits}
		</td>
	</tr>
)

export default ResultsTableRow;