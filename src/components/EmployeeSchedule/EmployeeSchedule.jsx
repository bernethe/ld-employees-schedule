import React, { useState } from 'react'
// import EmployeeScheduleSortSelect from './EmployeeScheduleSortSelect.jsx'
import EmployeeScheduleSnippet from './EmployeeScheduleSnippet.jsx'
import {ZZZIcon} from './EmployeeScheduleIcons.jsx'
import {capitalizeEachWord, scheduleTracks} from '../../global.jsx';
import './employee-schedule.css'

const EmployeeSchedule = ({weekStart, data}) => {

	// console.log(weekStart);

	const employeesAll = data.map(employee => ({
		...employee,
		area_slug: capitalizeEachWord(employee.area),
		department_slug: capitalizeEachWord(employee.area+' / '+employee.department),
		section_slug: capitalizeEachWord(employee.area+' / '+employee.department+' / '+employee.section),
		office_slug: capitalizeEachWord(employee.area+' / '+employee.department+' / '+employee.section+' / '+employee.office)
	}));

	const [employees, setEmployees] = useState([...employeesAll]);

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

	const handleSelectAll = () => {
		// const checkboxes = document.querySelectorAll('.employee-schedule-card input[type="checkbox"]');
		// checkboxes.forEach(checkbox => checkbox.checked = true);
	};

	const handleDeselectAll = () => {
		// const checkboxes = document.querySelectorAll('.employee-schedule-card input[type="checkbox"]');
		// checkboxes.forEach(checkbox => checkbox.checked = false);
	};

	return <>
		<div className='row'>
			<div className='col'>
				<small className='text-muted'>Ordenar por:</small>
				{/* <EmployeeScheduleSortSelect /> */}
				<select className='form-select form-select-sm employee-schedule-sort-select w-auto d-inline-block ms-2'>
					<option>ID (↑)</option>
					<option>ID (↓)</option>
					<option>Nombre (↑)</option>
					<option>Nombre (↓)</option>
					<option>Puesto (↑)</option>
					<option>Puesto (↓)</option>
					<option>Ubicación (↑)</option>
					<option>Ubicación (↓)</option>
				</select>
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
								<th scope='col'>
									<button className='btn btn-sm btn-outline-secondary me-2' onClick={ handleSelectAll }>Seleccionar Todos</button>
									<button className='btn btn-sm btn-outline-secondary' onClick={ handleDeselectAll }>Deseleccionar Todos</button>
								</th>
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