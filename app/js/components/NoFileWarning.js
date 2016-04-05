import React from 'react';

const NoFileWarning = () => (
	<div className="alert alert-warning" role="alert">
		<span className="sr-only">Error:</span>
		Please load a .csv <a href="https://secure.etosoftware.com/" className="alert-link">ETO</a> report.
	</div>
)

export default NoFileWarning;