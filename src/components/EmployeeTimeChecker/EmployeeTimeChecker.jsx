import React from 'react';
import {ZZZIcon} from './EmployeeTimeCheckerIcons';
import './employee-time-checker.css';

const EmployeeTimeChecker = ({weekStart, data}) => {

	const weekDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

	const getNextWeekDates = () => {
		const today = weekStart ? new Date(weekStart) : new Date();
		const dates = [];
		for (let i = 0; i < 7; i++) {
			dates.length === 0 ? dates.push(weekStart) : dates.push(new Date(today.setDate(today.getDate() + 1)));
		}
		return dates;
	};

	const dates = getNextWeekDates(weekStart);

	return <table className='table employee-time-checker'>
		<thead>
			<tr>
				<th></th>
				{
					weekDays.map((day, i) => <th scope='col' key={i}>
						<div>{day}</div>
						<div>{dates[i]?.getDate()}</div>
					</th>)
				}
				<th>
					<div>Rebajos</div>
					<div>(hrs)</div>
				</th>
			</tr>
		</thead>
		<tbody>
			{
				data.map((employee, empIndex) => <tr key={empIndex}>
						<td>{employee.name}</td>
						{
							employee.timer.map((time, timeIndex) => <td key={timeIndex}>
								<div className={ `employee-time-checker-table-snipple employee-time-checker-table-snipple-${time.visual}` }>
									{ time.hours }
									{ time.visual === 'free' && <><ZZZIcon /><small>Día Libre</small></> }
								</div>
							</td>)
						}
						<td>{employee.timer.reduce((acumulador, objeto) => objeto.isChecked ? acumulador + objeto.diff : acumulador, 0)}</td>
					</tr>
				)
			}
		</tbody>
	</table>
}

export default EmployeeTimeChecker