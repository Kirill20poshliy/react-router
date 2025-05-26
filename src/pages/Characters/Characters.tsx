import { FC, useCallback } from 'react'
import { CharacterCard } from './components/CharacterCard/CharacterCard'
import { useSearchParams } from 'react-router-dom'
import characterService from '../../api/characterService'
import { useInfinityScroll } from '../../hooks/useInfinityScroll'
import { ICharacter } from '../../models/character'

export const Characters: FC = () => {

    const fetchCharacters = useCallback(async (page: number): Promise<ICharacter[]> => {
        try {
            const response = await characterService.getAllFromPage(page);
        if (!response) return [];
            return response.data.results;
        } catch (error) {
            console.error('Error fetching characters:', error);
            return [];
        }
    }, []);

    const { items, isLoading, hasMore, error, triggerRef } = useInfinityScroll<ICharacter>(fetchCharacters);

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
                .map(char => (
                    <CharacterCard key={char.id + char.name} {...char}/>
                ))
            }
            <div ref={triggerRef} style={{ height: '20px' }} />
            {isLoading && <div>Loading...</div>}
            {!hasMore && !isLoading && (
                <div>No more characters to load.</div>
            )}
        </div>
    )
}
