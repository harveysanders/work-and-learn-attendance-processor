import React from 'react';

const UploadFileForm = ({handleFile, helpText}) => (
	<form role='form'>
		<div className='form-group'>
			<input 
				type="file" 
				id='csv-input'
				accept=".csv"
				className="text-center"
				onChange={handleFile} 
			/>
			<p className="help-block">
				{helpText}
			</p>
		</div>
	</form>
);

export default UploadFileForm;