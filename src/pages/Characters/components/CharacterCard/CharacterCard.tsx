import { FC } from 'react'
import './CharacterCard.scss'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { Flex } from 'antd'

export const CharacterCard: FC<{
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    image: string,
    created: string
}> = ({id, name, status, species, type, gender, image, created}) => {
    const navigate = useNavigate()
    return (
        <Flex gap={"1rem"} onClick={() => navigate(`${id}`)} className='character-card'>
            <img src={image} alt={name} />
            <Flex vertical gap={".25rem"} className='characteristics'>
                <h2>{name}, {gender}</h2>
                <p>Статус: <b>{status}</b></p>
                <p>Разновидность: <b>{species}</b></p>
                {type && (<p>Тип: <b>{type}</b></p>)}
                <p>Создан(а): <b>{dayjs(created).format("DD.MM.YYYY HH:mm")}</b></p>
            </Flex>
        </Flex>
    )
}

