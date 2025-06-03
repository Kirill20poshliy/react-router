import { FC, useCallback} from 'react'
import './LocationPage.scss'
import { useNavigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { AxiosResponse } from 'axios'
import { ILocationInfo } from '../../../../shared/models/location'
import locationService from '../../../../api/locationService'
import { useFetch } from '../../../../hooks/useFetch'
import { Flex } from 'antd'

const LocationPage: FC = () => {
    const { id } = useParams();

    const fetchLocation = useCallback(async (): Promise<AxiosResponse<ILocationInfo>> => {
        if (!id) throw new Error('Character ID is missing');
        const response = await locationService.getOne(id);
        return response  
    }, [id]);

    const { isLoading, isError, data: location } = useFetch<ILocationInfo>(fetchLocation);

    const navigate = useNavigate()

    if (!id) return <p>Episode ID is missing</p>;
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Failed to load location</p>;
    if (!location) return <div className='empty'>
        <p>Локация не найден...</p>
        <button onClick={() => navigate(-1)} className='btn primary'>Назад</button>
    </div>;

    return (
        <Flex gap={"2rem"} className='location-page'>
            <Flex vertical gap={".25rem"} className='characteristics'>
                <h2>{location.name}, {location.dimension}</h2>
                {location.type && (<p>Тип: <b>{location.type}</b></p>)}
                <p>Создан(а): <b>{dayjs(location.created).format("DD.MM.YYYY HH:mm")}</b></p>
            </Flex>
        </Flex>
    )
}

export default LocationPage
