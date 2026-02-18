import React, {useState} from 'react';
import Select from 'react-select';
// import { FaThumbsUp, FaUmbrellaBeach, FaBriefcaseMedical, FaGavel } from 'react-icons/fa';
import Modal from '../Modal/Modal';
import EmployeeTimeCheckerSnippet from './EmployeeTimeCheckerSnippet';
import { BriefcaseMedicalIcon, GavelIcon, ThumbsUpIcon, UmbrellaBeachIcon,ZZZIcon } from './EmployeeTimeCheckerIcons';
import './employee-time-checker.css';

const weekDays = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const weekDaysShort = ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'];
const monthsShort = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const opcionesDeJustificacion = [
	{
		value: 1,
		label: 'Ausencia'
	},
	{
		value: 2,
		label: 'Cambio de Jornada'
	},
	{
		value: 3,
		label: 'Incapacidad'
	},
	{
		value: 4,
		label: 'Permiso no procede rebajo'
	},
	{
		value: 5,
		label: 'Permiso procede rebajo'
	},
	{
		value: 6,
		label: 'Tardía procede rebajo'
	},
	{
		value: 7,
		label: 'Tardía no procede rebajo'
	}
];

const EmployeeTimeChecker = ({weekStart, data}) => {

	const [empData, setEmpData] = useState([...data]);
	const [showModal, setShowModal] = useState(null);

	const [modalSelectedValue, setModalSelectedValue] = useState(null);

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

	const handleClick = (time, employee, timeIndex) => {
		if (time.visual === 'warning' || time.visual === 'danger') {
			// console.log({...time, ...employee, timeIndex});
			setShowModal({...time, ...employee, timeIndex });
		}
	}


	return <>
		<table className='table employee-time-checker'>
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
									<div className={ `employee-time-checker-table-snipple employee-time-checker-table-snipple-${time.visual}` } onClick={ () => handleClick(time, employee, timeIndex) }>
										{ time.hours !== '' && <p className='m-0'>{ time.hours }</p> }
										{ time.visual === 'warning' || time.visual === 'danger' ? <>
											<label className='employee-time-checker-table-snipple-checkbox' onClick={e => e.stopPropagation()}><input type="checkbox" checked={Boolean(time.isChecked)} onClick={e => e.stopPropagation()} onChange={ () => handleCheckbox(employee.id, timeIndex) }/></label>
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
		{showModal && <Modal onClose={() => setShowModal(null)} closeWithBackdrop={true}>
			<div className='row border-bottom mb-3'>
				<div className='col-sm-12'>
					<h5>Justificación de Horario</h5>
				</div>
			</div>
			{/* <div className='row'>
				<div className='col-sm-6 col-md-8'>
					<EmployeeTimeCheckerSnippet employee={showModal} />
				</div>
				<div className='col-sm-6 col-md-4'>
					<div className={`employee-time-modal employee-time-modal-${showModal.visual}`}>
						<strong className='small'>Día:</strong> {weekDaysShort[showModal.timeIndex]} {dates[showModal.timeIndex]?.getDate()} de {monthsShort[dates[showModal.timeIndex]?.getMonth()]}, {dates[showModal.timeIndex]?.getFullYear()}<br />
						<strong className='small'>Horario:</strong> {showModal.hours}<br />
						<strong className='small'>Horas no laboradas:</strong> {showModal.diff} hrs
					</div>
				</div>
			</div> */}
			<div className='row'>
				<div className='col-sm-12'>
					<img src={showModal.img} alt={showModal.name} className='employee-time-modal-img' />
					<span>{showModal.name}</span>
				</div>
			</div>
			<div className='row'>
				<div className='col-12'>
					<div className={`employee-time-modal-data employee-time-modal-data-${showModal.visual}`}>
						<strong className='small'>Día:</strong> {weekDaysShort[showModal.timeIndex]} {dates[showModal.timeIndex]?.getDate()} de {monthsShort[dates[showModal.timeIndex]?.getMonth()]}, {dates[showModal.timeIndex]?.getFullYear()}<br />
						<strong className='small'>Horario:</strong> {showModal.hours}<br />
						<strong className='small'>Horas no laboradas:</strong> {showModal.diff} hrs
					</div>
				</div>
			</div>
			<div className='row'>
				<div className='col-sm-12'>
					<small className='text-muted'>Justificaciones predefinidas</small>
					<Select placeholder='Selecciona una justificación' options={opcionesDeJustificacion} value={modalSelectedValue} onChange={setModalSelectedValue} />
				</div>
			</div>
			{
				modalSelectedValue?.value === 5 && <div className='row my-2'>
					{/* <div className='col-sm-4'>
						<label className='text-muted'><small>Minutos de tardía/anticipo</small></label>
						<input type='number' className='form-control' value={showModal.diff*60} disabled />
					</div>
					<div className='col-sm-4'>
						<label className='text-muted'><small>Horas correspondientes a rebajo</small></label>
						<input type='number' className='form-control' value={showModal.diff} disabled />
					</div> */}
					<div className='col-sm-4'>
						<label className='text-muted'><small>Horas a rebajar</small></label>
						<input type='number' className='form-control' value={showModal.diff} />
					</div>
					{
						showModal.diff === 8 && <div className='col-12 mb-2'>
							<small className='text-muted'>Al no tener marcas registradas en este día, corresponde al rebajo de 8.00 hora(s) al colaborador</small>
						</div>
					}
				</div>
			}
			<div className='row my-2'>
				<div className='col-sm-12'>
					<label className='text-muted'><small>Observación</small></label>
					<textarea className='form-control'></textarea>
				</div>
			</div>
			<div className='row mt-2'>
				<div className='col-12 text-end'>
					<label className='text-muted me-2'>
						<input type='checkbox' className='form-check-input me-1' disabled /> Justificar toda la semana
					</label>
					<button className='btn btn-outline-secondary me-2' onClick={() => setShowModal(null)}>Cerrar</button>
					<button className='btn btn-primary'>Guardar</button>
				</div>
			</div>
		</Modal>}
	</>
}

export default EmployeeTimeChecker