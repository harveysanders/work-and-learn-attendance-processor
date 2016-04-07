import React from 'react';

const NoFileWarning = () => (
	<div className="alert alert-warning" role="alert">
		<span className="sr-only">Error:</span>
		Please choose a .csv <a href="https://secure.etosoftware.com/" className="alert-link">ETO</a> report to process.
	</div>
)

export default NoFileWarning;