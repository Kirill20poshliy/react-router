import { FC } from 'react'
import locations from '../../mocks/location.json'
import { LocationCard } from './components/LocationCard/LocationCard'
import { useSearchParams } from 'react-router-dom'

export const Locations: FC = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const sortHandler = () => {
        const created = searchParams.get('created')
        if (!created || created === 'DESC') {
            setSearchParams({created: 'ASC'})
        } else if (created === 'ASC') {
            setSearchParams({created: 'DESC'})
        }
    }
    
    return (
        <div className='list'>
            <div>
                <button 
                    className='btn secondary'
                    onClick={sortHandler}
                >
                    Сортировать по дате создания
                </button>
            </div>
            {locations
                .sort((a, b) => {
                    if (searchParams.get('created') === 'ASC') {
                        return a.created.localeCompare(b.created)
                    } else {
                        return b.created.localeCompare(a.created)
                    }
                })
                .map(location => (
                    <LocationCard key={location.id} {...location}/>
                ))
            }
        </div>
    )
}
