import React from 'react';
import moment from 'moment';

class MoreDetailsModalContainer extends React.Component {
	constructor(props) {
		super(props);
	}
 render() {
 	let entries = this.props.attendanceEntries.map((entry, i) => {
 		return (
 			<tr key={i}>
	 			<td>
	 				{moment(entry.responseDate, "M/D/YYYY").format('dddd, MM/DD/YY' )}
	 			</td>
	 			<td>
					{entry.classHours}
	 			</td>
	 			<td>
					{entry.extraHours}
	 			</td>
	 			<td>
					{entry.extraCredit}
	 			</td>
	 			<td>
					{entry.totalDailyTime}
	 			</td>
	 			<td>
					{entry.totalDailyCredits}
	 			</td>
 			</tr>
		)
 	})
 	return (
		<div className="modal fade" id={this.props.targetID} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
		  <div className="modal-dialog" role="document">
		    <div className="modal-content">
		      <div className="modal-header">
		        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		        <h4 className="modal-title" id="myModalLabel">{this.props.attendanceEntries[0].subjectName}</h4>
		      </div>
		      <div className="modal-body">
		        <table className="table table-hover table-condensed table-striped">
							<thead>
								<tr>
									<th>
										Date
									</th>
									<th>
										Class Hours
									</th>
									<th>
										Extra Hours
									</th>
									<th>
										Extra Credit
									</th>
									<th>
										Total Hours
									</th>
									<th>
										Total Credit
									</th>
								</tr>
							</thead>
							<tbody>
								{entries}
							</tbody>
						</table>
		      </div>
		      <div className="modal-footer">
		        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
		      </div>
		    </div>
		  </div>
		</div>
	)
 }
}

export default MoreDetailsModalContainer;