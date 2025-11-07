import React, { useState } from 'react'
import EmployeeScheduleSortSelect from './EmployeeScheduleSortSelect.jsx'
import EmployeeScheduleSnippet from './EmployeeScheduleSnippet.jsx'
import {ZZZIcon} from './EmployeeScheduleIcons.jsx'
import './employee-schedule.css'
import data from '../../json/employees-cards.json'
import {capitalizeEachWord, scheduleTracks} from '../../global.jsx';

const EmployeeSchedule = () => {

	const employeesAll = data.map(employee => ({
		...employee,
		area_slug: capitalizeEachWord(employee.area),
		department_slug: capitalizeEachWord(employee.area+' / '+employee.department),
		section_slug: capitalizeEachWord(employee.area+' / '+employee.department+' / '+employee.section),
		office_slug: capitalizeEachWord(employee.area+' / '+employee.department+' / '+employee.section+' / '+employee.office)
	}));

	const [employees, setEmployees] = useState([...employeesAll]);

	const weekDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
	// get dates next week begin monday
	const getNextWeekDates = () => {
		const today = new Date();
		const nextWeek = new Date(today.setDate(today.getDate() + (7 - today.getDay()) % 7));
		const dates = [];
		for (let i = 0; i < 7; i++) {
			dates.push(new Date(nextWeek.setDate(nextWeek.getDate() + 1)));
		}
		return dates;
	};
	const dates = getNextWeekDates();

	return <>
		<div className='row'>
			<div className='col'>
				<small className='text-muted'>Ordenar por:</small> <EmployeeScheduleSortSelect />
			</div>
			<div className='col d-flex flex-row align-items-center flex-wrap justify-content-end gap-2'>
				<input type='text' className='form-control w-auto' placeholder='Buscar...' />
			</div>
		</div>
		<div className='row mt-4'>
			<div className='col'>
				<div className='table-responsive'>
					<table className='table employee-schedule'>
						<thead>
							<tr>
								<th scope='col'></th>
								{
									weekDays.map((day, i) => <th scope='col' key={i}>
										<div>{day}</div>
										<div>{dates[i]?.getDate()}</div>
									</th>)
								}
							</tr>
						</thead>
						<tbody>
							{employees.map((emp) => <tr key={emp.id}>
								<td>
									<EmployeeScheduleSnippet employee={emp} />
								</td>
								{
									weekDays.map((day, i) => <td key={i}>
										<div className={ `employee-schedule-box employee-schedule-box-${scheduleTracks[emp.schedule-1].tracks[i] === '' ? 'free-day' : emp.isAssigned === 1 ? 'assigned' : 'unassigned'}` }>
											{ scheduleTracks[emp.schedule-1].tracks[i] !== '' ? scheduleTracks[emp.schedule-1].tracks[i] : <>
												<ZZZIcon />
												<small>Día Libre</small>
											</> }
										</div>
									</td>)
								}
							</tr>)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</>
}

export default EmployeeSchedule