import { FC } from 'react'
import './EpisodeCard.scss'
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

export const EpisodeCard: FC<{
    id: number;
    name: string;
    air_date: string;
    episode: string;
    created: string;
}> = ({
    id,
    name,
    air_date,
    episode,
    created,
}) => {
    const navigate = useNavigate()

    return (
        <div onClick={() => navigate(`${id}`)} className='episode-card'>
            <div className='characteristics'>
                <h2>{name}, {episode}</h2>
                <p>Дата выхода: <b>{air_date}</b></p>
                <p>Создан(а): <b>{dayjs(created).format("DD.MM.YYYY HH:mm")}</b></p>
            </div>
        </div>
    )
}
