import React from 'react'
import Select from 'react-select'
import {HiSparkles} from 'react-icons/hi'
import EmployeeSchedule from './components/EmployeeSchedule/EmployeeSchedule'

const App = () => {
	return <div className='container'>
		<div className='row filtros'>
			<div className='col'>
				<label>
					<small>Semana</small>
					<Select options={[]} />
				</label>
			</div>
		</div>
		<div className='row filtros'>
			<div className='col'>
				<label>
					<small>Semana</small>
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
				<button className='btn btn-outline-dark border-light-subtle'><HiSparkles /></button>
			</div>
			<div className='col-8 d-flex flex-row align-items-center flex-wrap justify-content-end gap-2'>
				<button className='btn btn-primary'>Enviar Alerta</button>
				<button className='btn btn-primary'>Aplicar</button>
			</div>
		</div>
		<div className='row mt-4'>
			<div className='col'>
				<EmployeeSchedule />
			</div>
		</div>
	</div>
}

export default App