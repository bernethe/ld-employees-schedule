import React, {useState} from 'react';
import { FaThumbsUp, FaUmbrellaBeach, FaBriefcaseMedical, FaGavel } from 'react-icons/fa';
import EmployeeTimeCheckerSnippet from './EmployeeTimeCheckerSnippet';
import { BriefcaseMedicalIcon, GavelIcon, ThumbsUpIcon, UmbrellaBeachIcon,ZZZIcon } from './EmployeeTimeCheckerIcons';
import './employee-time-checker.css';

const EmployeeTimeChecker = ({weekStart, data}) => {

	const [empData, setEmpData] = useState([...data]);

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

	const handleCheckbox = (employeeID, timeIndex) => {
		// console.log('Checkbox clicked for employee ID:', employeeID, 'and time index:', timeIndex);
		const tempData = empData.map(employee => {
			if (employee.id === employeeID) {
				const updatedTimer = employee.timer.map((time, index) => {
					if (index === timeIndex) {
						return {...time, isChecked: !time.isChecked};
					}
					return time;
				});
				return {...employee, timer: updatedTimer};
			}
			return employee;
		});
		setEmpData(tempData);
	}

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
				empData.map((employee, empIndex) => <tr key={empIndex}>
						<td><EmployeeTimeCheckerSnippet employee={employee} /></td>
						{
							employee.timer.map((time, timeIndex) => <td key={timeIndex}>
								<div className={ `employee-time-checker-table-snipple employee-time-checker-table-snipple-${time.visual}` }>
									{ time.hours !== '' && <p className='m-0'>{ time.hours }</p> }
									{ time.visual === 'warning' || time.visual === 'danger' ? <>
										<label className='employee-time-checker-table-snipple-checkbox'><input type="checkbox" checked={Boolean(time.isChecked)} onChange={ (e) => handleCheckbox(employee.id, timeIndex) }/></label>
										<p className={ `m-0 ${ time.isChecked ? 'employee-time-checker-table-snipple-checked-txt' : '' }` }>-{ time.diff } hrs</p>
									</> : '' }
									{ time.visual === 'free' && <><ZZZIcon /><small>Día Libre</small></> }
									{ time.visual === 'suspension' && <><GavelIcon /><small>Suspención</small></> }
									{ time.visual === 'sick' && <><BriefcaseMedicalIcon /><small>Enfermedad</small></> }
									{ time.visual === 'permission' && <><ThumbsUpIcon /><small>Permiso</small></> }
									{ time.visual === 'vacation' && <><UmbrellaBeachIcon /><small>Vacaciones</small></> }
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