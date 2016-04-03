import React from 'react';

const UploadFileForm = ({handleFile}) => (
	<form role='form'>
		<div className='form-group'>
			<label htmlFor="csv-input">
				Upload ETO attendance file:
			</label>
			<input 
				type="file" 
				id='csv-input'
				accept=".csv"
				className="text-center"
				onChange={handleFile} 
			/>
			<p className="help-block">
				ex: RadGridExport.csv
			</p>
		</div>
	</form>
)

export default UploadFileForm;