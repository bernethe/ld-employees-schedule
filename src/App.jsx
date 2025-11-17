import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import EmployeeSchedulePage from './components/pages/EmployeeSchedulePage';
import EmployeeTimeCheckerPage from './components/pages/EmployeeTimeCheckerPage';

const App = () => {
	return <Router>
		<Routes>
			<Route exact path='/' element={<EmployeeSchedulePage />} />
			<Route exact path='/marcas' element={<EmployeeTimeCheckerPage />} />
		</Routes>
	</Router>
}

export default App