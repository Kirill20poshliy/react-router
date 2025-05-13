import { FC } from 'react'
import characters from '../../mocks/characters.json'
import { CharacterCard } from './components/CharacterCard/CharacterCard'
import { useSearchParams } from 'react-router-dom'

export const Characters: FC = () => {
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
            {characters
                .sort((a, b) => {
                    if (searchParams.get('created') === 'ASC') {
                        return a.created.localeCompare(b.created)
                    } else {
                        return b.created.localeCompare(a.created)
                    }
                })
                .map(char => (
                    <CharacterCard key={char.id + char.name} {...char}/>
                ))
            }
        </div>
    )
}
