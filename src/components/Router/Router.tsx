import { FC } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Layout from '../Layout/Layout'
import { Home } from '../../pages/Home/Home'
import { Characters } from '../../pages/Characters/Characters'
import { Locations } from '../../pages/Locations/Locations'
import { Episodes } from '../../pages/Episodes/Episodes'
import CharacterPage from '../../pages/Characters/components/CharacterPage/CharacterPage'
import LocationPage from '../../pages/Locations/components/LocationPage/LocationPage'
import EpisodePage from '../../pages/Episodes/components/EpisodePage/EpisodePage'

export const Router: FC = () => {
	const navigate = useNavigate()

	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<Home />}/>
				<Route path='characters' element={<Characters />} />
				<Route path='characters/:id' element={<CharacterPage />} />
				<Route path='locations' element={<Locations />} />
				<Route path='locations/:id' element={<LocationPage />} />
				<Route path='episodes' element={<Episodes />} />
				<Route path='episodes/:id' element={<EpisodePage />} />
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
