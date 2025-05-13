import { FC } from 'react'
import './App.scss'
import { Router } from './components/Router/Router'
import { AuthProvider } from './context/AuthContext'

export const App: FC = () => {
	return (
		<AuthProvider>
			<Router />
		</AuthProvider>
	)
}

export default App
