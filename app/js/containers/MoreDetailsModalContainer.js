import React from 'react';
import moment from 'moment';
import utils from '../utils';

class MoreDetailsModalContainer extends React.Component {
	constructor(props) {
		super(props);
	}
	getAttendanceLabels(entry) {
		let attendanceLabel = {type: '', text: ''}
		switch(entry) {
			case 'On Time - Present':
				attendanceLabel = {type: 'success', text:'On Time'}
				break;
		case 'Late but Present':
				attendanceLabel = {type: 'warning', text:'Late'}
				break;
		case 'Absent':
				attendanceLabel = {type: 'danger', text:'Absent'}
				break;
		default:
			attendanceLabel = {type: 'default', text:'N/A'};
		}return attendanceLabel;
	}

	fillBlanksWithZero(str) {
		return /^[A-Za-z0-9]/.test(str) ? str : '0'
	}

 render() {
 	let entries = this.props.attendanceEntries.map((entry, i) => {
		let classAttLabel = this.getAttendanceLabels(entry.classAttendance);
		let extraHoursAttLabel = this.getAttendanceLabels(entry.extraHoursAttendance);
 		return (
 			<tr key={i}>
	 			<td>
	 				{moment(entry.responseDate, "M/D/YYYY").format('dddd, MM/DD/YY' )}
	 			</td>
	 			<td>
					<span className={"label label-" + classAttLabel.type}>
						{classAttLabel.text}
					</span>
	 			</td>
	 			<td>
					{this.fillBlanksWithZero(entry.classHours)}
	 			</td>
	 			<td>
					<span className={"label label-" + extraHoursAttLabel.type}>
						{extraHoursAttLabel.text}
					</span>
	 			</td>
	 			<td>
					{this.fillBlanksWithZero(entry.extraHours)}
	 			</td>
	 			<td>
					{this.fillBlanksWithZero(entry.extraCredit)}
	 			</td>
	 			<td>
					{entry.totalDailyTime}
	 			</td>
	 			<td>
					{utils.roundDownToHalf(Number(entry.totalDailyCredits)) }
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
		        <div className="modal-title" id="myModalLabel"><h4>{this.props.attendanceEntries[0].subjectName}</h4> 	
		        	Total Credits: {this.props.totalCredits}
		        </div>
		      </div>
		      <div className="modal-body">
		        <table className="table table-hover table-condensed table-striped">
							<thead>
								<tr>
									<th>
										Date
									</th>
									<th>
										Class Attendance
									</th>
									<th>
										Class Hours
									</th>
									<th>
										Extra Hours Attendance
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