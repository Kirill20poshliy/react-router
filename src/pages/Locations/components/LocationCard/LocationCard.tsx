import dayjs from 'dayjs';
import './LocationCard.scss';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex } from 'antd';

export const LocationCard: FC<{
    id: number;
    name: string;
    type: string;
    dimension: string;
    created: string;
}> = ({
    id,
    name,
    type,
    dimension,
    created,
}) => {
    const navigate = useNavigate()
    
    return (
        <Flex gap={"1rem"} onClick={() => navigate(`${id}`)} className='location-card'>
            <Flex vertical gap={".25rem"} className='characteristics'>
                <h2>{name}, {dimension}</h2>
                {type && (<p>Тип: <b>{type}</b></p>)}
                <p>Создан(а): <b>{dayjs(created).format("DD.MM.YYYY HH:mm")}</b></p>
            </Flex>
        </Flex>
    )
}
