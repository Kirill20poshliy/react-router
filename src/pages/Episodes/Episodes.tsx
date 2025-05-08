import { FC } from 'react';
import episodes from '../../mocks/episode.json'
import { EpisodeCard } from './components/EpisodeCard/EpisodeCard';
import { useSearchParams } from 'react-router-dom';

export const Episodes: FC = () => {
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
            {episodes
                .sort((a, b) => {
                    if (searchParams.get('created') === 'ASC') {
                        return a.created.localeCompare(b.created)
                    } else {
                        return b.created.localeCompare(a.created)
                    }
                })
                .map(episode => (
                    <EpisodeCard key={episode.id} {...episode}/>
                ))
            }
        </div>
    )
}
