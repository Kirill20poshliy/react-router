import { FC, useEffect, useState } from 'react'
import './EpisodePage.scss'
import { useNavigate, useParams } from 'react-router-dom'
import episodes from '../../../../mocks/episode.json'
import dayjs from 'dayjs'

interface IEpisode {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    created: string;
}

const EpisodePage: FC = () => {
    const { id } = useParams();
    const [episode, setEpisode] = useState<IEpisode>()

    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            setEpisode(episodes.find(
                episode => episode.id === Number(id)
            ))
        }
    }, [id])

    return episode 
        ? (
            <div className='character-page'>
            <div className='characteristics'>
                <h2>{episode.name}, {episode.episode}</h2>
                <p>Дата выхода: <b>{episode.air_date}</b></p>
                <p>Создан(а): <b>{dayjs(episode.created).format("DD.MM.YYYY HH:mm")}</b></p>
            </div>
            </div>
        )
        : (
            <div className='empty'>
                <p>Эпизод не найден...</p>
                <button onClick={() => navigate(-1)} className='btn primary'>Назад</button>
            </div>
        )
}

export default EpisodePage
