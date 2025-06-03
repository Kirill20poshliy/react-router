import { FC, useCallback } from 'react'
import './EpisodePage.scss'
import { useNavigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { IEpisode } from '../../../../shared/models/episode'
import { AxiosResponse } from 'axios'
import episodeService from '../../../../api/episodeService'
import { useFetch } from '../../../../hooks/useFetch'

const EpisodePage: FC = () => {
    const { id } = useParams();

    const fetchEpisode = useCallback(async (): Promise<AxiosResponse<IEpisode>> => {
        if (!id) throw new Error('Character ID is missing');
        const response = await episodeService.getOne(id);
        return response  
    }, [id]);

    const { isLoading, isError, data: episode } = useFetch<IEpisode>(fetchEpisode);
    
    const navigate = useNavigate()

    if (!id) return <p>Episode ID is missing</p>;
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Failed to load episode</p>;
    if (!episode) return <div className='empty'>
        <p>Эпизод не найден...</p>
        <button onClick={() => navigate(-1)} className='btn primary'>Назад</button>
    </div>;

    return (
        <div className='character-page'>
            <div className='characteristics'>
                <h2>{episode.name}, {episode.episode}</h2>
                <p>Дата выхода: <b>{episode.air_date}</b></p>
                <p>Создан(а): <b>{dayjs(episode.created).format("DD.MM.YYYY HH:mm")}</b></p>
            </div>
        </div>
    )
}

export default EpisodePage
