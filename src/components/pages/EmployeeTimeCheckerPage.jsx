import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import { startOfWeek, endOfWeek, addDays } from 'date-fns';
import { FaSyncAlt } from 'react-icons/fa';
import EmployeeTimeChecker from '../EmployeeTimeChecker/EmployeeTimeChecker.jsx';
import myData from '../../json/employees-time-checker.json';

registerLocale('es', es);


const today = new Date();
const startOfCurrentWeek = startOfWeek(today, { locale: es });
const endOfCurrentWeek = endOfWeek(startOfCurrentWeek, { locale: es });

const EmployeeTimeCheckerPage = () => {

	const [startDate, setStartDate] = useState(startOfCurrentWeek);
	const [endDate, setEndDate] = useState(endOfCurrentWeek);
	
	const handleWeekChange = (date) => {
		// Encuentra el Lunes de la semana seleccionada, usando el locale 'es'
		const monday = startOfWeek(date, { locale: es });
		
		// Encuentra el Domingo de la semana seleccionada, usando el locale 'es'
		const sunday = endOfWeek(date, { locale: es });

		setStartDate(monday);
		setEndDate(sunday);
	};
	
	return <div className='container py-4'>
		<div className='row'>
			<div className='col'>
				<h1>Control de Marcas</h1>
			</div>
		</div>
		<div className='row align-items-end'>
			<div className='col-sm-3 my-2'>
				<small>Semana</small><br />
				<DatePicker
					className='form-control w-100'
					startDate={startDate}
					endDate={endDate}
					onChange={handleWeekChange}
					dateFormat='dd/MM/yyyy'
					locale='es'
					maxDate={startOfCurrentWeek}
					showWeekNumbers
					selectsRange
					showWeekPicker
					showIcon
				/>
			</div>
			<div className='col-sm-3 text-start my-2'>
				<button className='btn btn-primary'><FaSyncAlt /></button>
			</div>
			<div className='col-sm-6 text-end my-2'>
				<button className='btn btn-primary'>Aplicar</button>
			</div>
		</div>
		<div className='row align-items-end'>
			<div className='col-sm-3 my-2'>
				Filtrar por: <select className='form-select'>
					<option>Sin marcas</option>
					<option>Con marcas</option>
					<option>Todas</option>
				</select>
			</div>
			<div className='col-sm-3 offset-sm-6 my-2'>
				<input type='text' className='form-control' placeholder='Buscar...' />
			</div>
		</div>
		<div className='row'>
			<div className='col'><EmployeeTimeChecker weekStart={startDate} data={myData} /></div>
		</div>
	</div>
}

export default EmployeeTimeCheckerPage