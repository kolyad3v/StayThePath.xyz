import Navbar from './components/loginScreen-components/layout/Navbar.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Fragment } from 'react'
import Home from './components/loginScreen-components/pages/Home.js'
import About from './components/loginScreen-components/pages/About.js'

import PathState from './context/Paths/PathState'
import AuthState from './context/auth/AuthState'
import AlertState from './context/alert/AlertState'

import Register from './components/loginScreen-components/auth/Register'
import Login from './components/loginScreen-components/auth/Login'
import Alert from './components/loginScreen-components/layout/Alert'
import PrivateRoute from './components/routing/PrivateRoute'

const App = () => {
	return (
		<AuthState>
			<PathState>
				<AlertState>
					<BrowserRouter>
						<Fragment>
							<Navbar />
							<div className='container'>
								<Alert />
								<Routes>
									<Route path='/' element={<PrivateRoute component={Home} />} />
									<Route path='/about' element={<About />} />
									<Route path='/register' element={<Register />} />
									<Route path='/login' element={<Login />} />
								</Routes>
							</div>
						</Fragment>
					</BrowserRouter>
				</AlertState>
			</PathState>
		</AuthState>
	)
}

export default App
