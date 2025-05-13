import { FC, useEffect, useState } from 'react'
import './LocationPage.scss'
import { useNavigate, useParams } from 'react-router-dom'
import locations from '../../../../mocks/location.json'
import dayjs from 'dayjs'

interface ILocation {
    id: number;
    name: string;
    type: string;
    dimension: string;
    created: string;
}

const LocationPage: FC = () => {
    const { id } = useParams();
    const [location, setLocation] = useState<ILocation>()

    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            setLocation(locations.find(
                location => location.id === Number(id)
            ))
        }
    }, [id])

    return location 
        ? (
            <div className='character-page'>
                <div className='characteristics'>
                    <h2>{location.name}, {location.dimension}</h2>
                    {location.type && (<p>Тип: <b>{location.type}</b></p>)}
                    <p>Создан(а): <b>{dayjs(location.created).format("DD.MM.YYYY HH:mm")}</b></p>
                </div>
            </div>
        )
        : (
            <div className='empty'>
                <p>Локация не найдена...</p>
                <button onClick={() => navigate(-1)} className='btn primary'>Назад</button>
            </div>
        )
}

export default LocationPage
