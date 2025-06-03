import { FC, lazy } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Layout from '../Layout/Layout'
import RequireAuth from '@shared/components/RequireAuth/RequireAuth'
import ErrorBoundary from '@shared/components/ErrorBoundary/ErrorBoundary';

const Home = lazy(() => import(
		'../pages/Home/Home'
	).then(module => ({default: module.Home})
));
const Characters = lazy(() => import(
		'../pages/Characters/Characters'
	).then(module => ({default: module.Characters})
));
const Locations = lazy(() => import(
		'../pages/Locations/Locations'
	).then(module => ({default: module.Locations})
));
const Episodes = lazy(() => import(
		'../pages/Episodes/Episodes'
	).then(module => ({default: module.Episodes})
));
const CharacterPage = lazy(() => import(
	'../pages/Characters/components/CharacterPage/CharacterPage'
));
const LocationPage = lazy(() => import(
	'../pages/Locations/components/LocationPage/LocationPage'
));
const EpisodePage = lazy(() => import(
	'../pages/Episodes/components/EpisodePage/EpisodePage'
));
const Login = lazy(() => import(
	'../pages/Login/Login'
));

export const Router: FC = () => {
	const navigate = useNavigate()

	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<Home />}/>
				<Route path='signin' element={
					<ErrorBoundary>
						<Login />
					</ErrorBoundary>
				} />
				<Route element={<RequireAuth/>}>
					<Route path='characters' element={
						<ErrorBoundary>
							<Characters />
						</ErrorBoundary>
					} />
					<Route path='characters/:id' element={
						<ErrorBoundary>
							<CharacterPage />
						</ErrorBoundary>
					} />
					<Route path='locations' element={
						<ErrorBoundary>
							<Locations />
						</ErrorBoundary>
					} />
					<Route path='locations/:id' element={
						<ErrorBoundary>
							<LocationPage />
						</ErrorBoundary>
					} />
					<Route path='episodes' element={
						<ErrorBoundary>
							<Episodes />
						</ErrorBoundary>
					} />
					<Route path='episodes/:id' element={
						<ErrorBoundary>
							<EpisodePage />
						</ErrorBoundary>
					} />
				</Route>
				<Route path='*' element={
					<div className='empty'>
						<h1>404</h1>
						<button className='btn primary' onClick={() => navigate(-1)}>
							Назад
						</button>
					</div>
				} />
			</Route>
		</Routes>
	)
}
