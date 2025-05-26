import { FC, useCallback } from 'react';
import { EpisodeCard } from './components/EpisodeCard/EpisodeCard';
import { useSearchParams } from 'react-router-dom';
import { IEpisode } from '../../models/episode';
import episodeService from '../../api/episodeService';
import { useInfinityScroll } from '../../hooks/useInfinityScroll';

export const Episodes: FC = () => {

    const fetchEpisodes = useCallback(async (page: number): Promise<IEpisode[]> => {
        try {
            const response = await episodeService.getAllFromPage(page);
        if (!response) return [];
            return response.data.results;
        } catch (error) {
            console.error('Error fetching characters:', error);
            return [];
        }
    }, []);

    const { items, isLoading, hasMore, error, triggerRef } = useInfinityScroll<IEpisode>(fetchEpisodes);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

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
            {items
                .sort((a, b) => {
                    if (searchParams.get('created') === 'ASC') {
                        return a.created.localeCompare(b.created)
                    } else if (searchParams.get('created') === 'DESC') {
                        return b.created.localeCompare(a.created)
                    } else {
                        return 0
                    }
                })
                .map(episode => (
                    <EpisodeCard key={episode.id} {...episode}/>
                ))
            }
            <div ref={triggerRef} style={{ height: '20px' }} />
            {isLoading && <div>Loading...</div>}
            {!hasMore && !isLoading && (
                <div>No more episodes to load.</div>
            )}
        </div>
    )
}
