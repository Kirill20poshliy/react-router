import { FC, useEffect, useState } from 'react'
import './CharacterPage.scss'
import { useNavigate, useParams } from 'react-router-dom'
import characters from '../../../../mocks/characters.json'
import dayjs from 'dayjs'

interface ICharacter {
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    image: string,
    created: string
}

const CharacterPage: FC = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState<ICharacter>()

    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            setCharacter(characters.find(
                character => character.id === Number(id)
            ))
        }
    }, [id])

    return character 
        ? (
            <div className='character-page'>
                <img src={character.image} alt={character.name} />
                <div className='characteristics'>
                    <h2>{character.name}, {character.gender}</h2>
                    <p>Статус: <b>{character.status}</b></p>
                    <p>Разновидность: <b>{character.species}</b></p>
                    {character.type && (<p>Тип: <b>{character.type}</b></p>)}
                    <p>Создан(а): <b>{dayjs(character.created).format("DD.MM.YYYY HH:mm")}</b></p>
                </div>
            </div>
        )
        : (
            <div className='empty'>
                <p>Персонаж не найден...</p>
                <button onClick={() => navigate(-1)} className='btn primary'>Назад</button>
            </div>
        )
}

export default CharacterPage
