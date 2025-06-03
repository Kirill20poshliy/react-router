import { FC, useCallback } from 'react'
import './CharacterPage.scss'
import { useNavigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { useFetch } from '../../../../hooks/useFetch'
import characterService from '../../../../api/characterService'
import { ICharacter } from '../../../../shared/models/character'
import { AxiosResponse } from 'axios'
import { Flex } from 'antd'


const CharacterPage: FC = () => {
    const { id } = useParams();

    const fetchCharacter = useCallback(async (): Promise<AxiosResponse<ICharacter>> => {
        if (!id) throw new Error('Character ID is missing');
        const response = await characterService.getOne(id);
        return response  
    }, [id]);

    const { isLoading, isError, data: character } = useFetch<ICharacter>(fetchCharacter);

    const navigate = useNavigate()

    if (!id) return <p>Character ID is missing</p>;
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Failed to load character</p>;
    if (!character) return <div className='empty'>
        <p>Персонаж не найден...</p>
        <button onClick={() => navigate(-1)} className='btn primary'>Назад</button>
    </div>;

    return (
        <Flex gap={"2rem"} className='character-page'>
            <img src={character.image} alt={character.name} />
            <Flex vertical gap={".25rem"} className='characteristics'>
                <h2>{character.name}, {character.gender}</h2>
                <p>Статус: <b>{character.status}</b></p>
                <p>Разновидность: <b>{character.species}</b></p>
                {character.type && (<p>Тип: <b>{character.type}</b></p>)}
                <p>Создан(а): <b>{dayjs(character.created).format("DD.MM.YYYY HH:mm")}</b></p>
            </Flex>
        </Flex>
    )
        
}

export default CharacterPage
