import React, {useState} from 'react'
import Select from 'react-select'
import DatePicker, { registerLocale } from 'react-datepicker'
import es from 'date-fns/locale/es'
import { startOfWeek, endOfWeek, addDays } from 'date-fns';
// import {HiSparkles} from 'react-icons/hi'
import EmployeeSchedule from '../EmployeeSchedule/EmployeeSchedule'
import 'react-datepicker/dist/react-datepicker.css'
import data from '../../json/employees-cards.json';

registerLocale('es', es);

// 1. Calcula las fechas de la próxima semana
const today = new Date();

// Obtenemos el Lunes de la semana actual
const startOfCurrentWeek = startOfWeek(today, { locale: es });

// Le sumamos 7 días para obtener el Lunes de la próxima semana
const nextWeekStart = addDays(startOfCurrentWeek, 7);

// Obtenemos el Domingo de esa próxima semana
const nextWeekEnd = endOfWeek(nextWeekStart, { locale: es });

const EmployeeSchedulePage = () => {

	const [startDate, setStartDate] = useState(nextWeekStart);
	const [endDate, setEndDate] = useState(nextWeekEnd);

	const handleWeekChange = (date) => {
		// Encuentra el Lunes de la semana seleccionada, usando el locale 'es'
		const monday = startOfWeek(date, { locale: es });
		
		// Encuentra el Domingo de la semana seleccionada, usando el locale 'es'
		const sunday = endOfWeek(date, { locale: es });

		setStartDate(monday);
		setEndDate(sunday);
	};

	return <div className='container py-4'>
		<div className='row filtros'>
			<div className='col-sm-3'>
				<small>Semana</small><br />
				<DatePicker
					className='form-control w-100'
					startDate={startDate}
					endDate={endDate}
					onChange={handleWeekChange}
					dateFormat='dd/MM/yyyy'
					locale='es'
					minDate={nextWeekStart}
					showWeekNumbers
					selectsRange
					showWeekPicker
					showIcon
				/>
			</div>
		</div>
		<div className='row filtros'>
			<div className='col'>
				<label>
					<small>Área</small>
					<Select options={[]} />
				</label>
				<label>
					<small>Departamento</small>
					<Select options={[]} />
				</label>
				<label>
					<small>Sección</small>
					<Select options={[]} />
				</label>
				<label>
					<small>Oficina</small>
					<Select options={[]} />
				</label>
				<div><button className='btn btn-primary w-100 mt-4'>Buscar</button></div>
			</div>
		</div>
		<div className='row mt-4'>
			<div className='col-4'>
				{/* <button className='btn btn-outline-dark border-light-subtle'><HiSparkles /></button> */}
			</div>
			<div className='col-8 d-flex flex-row align-items-center flex-wrap justify-content-end gap-2'>
				<button className='btn btn-primary'>Enviar Alerta</button>
				<button className='btn btn-primary'>Aplicar</button>
			</div>
		</div>
		<div className='row mt-4'>
			<div className='col'>
				<EmployeeSchedule weekStart={startDate} data={data} />
			</div>
		</div>
	</div>
}

export default EmployeeSchedulePage