import React from 'react'
import { FaArrowUpZA, FaArrowDownAZ, FaArrowDown19, FaArrowUp91 } from 'react-icons/fa6'

const EmployeeScheduleSortSelect = () => {

	const options = [
		{ value: 'id_desc', label: 'ID', icon: <FaArrowDown19 /> },
		{ value: 'id_asc', label: 'ID', icon: <FaArrowUp91 /> },
		{ value: 'name_asc', label: 'Nombre', icon: <FaArrowDownAZ /> },
		{ value: 'name_desc', label: 'Nombre', icon: <FaArrowUpZA /> },
		{ value: 'position_asc', label: 'Puesto', icon: <FaArrowDownAZ /> },
		{ value: 'position_desc', label: 'Puesto', icon: <FaArrowUpZA /> },
		{ value: 'location_asc', label: 'Ubicación', icon: <FaArrowDownAZ /> },
		{ value: 'location_desc', label: 'Ubicación', icon: <FaArrowUpZA /> },
	];

	return <select className='form-select employee-schedule-sort-select'>
		{/*
			Esto da error en consola pero lo están arreglando en futuras versiones de React
			https://github.com/facebook/react/issues/33038 
		*/}
		<button>
			<selectedcontent></selectedcontent>
		</button>
		{
			options.map((option) => <option key={option.value} value={option.value}>
				<span>{option.icon}</span>
				<span>{option.label}</span>
			</option>)
		}
	</select>
}

export default EmployeeScheduleSortSelect