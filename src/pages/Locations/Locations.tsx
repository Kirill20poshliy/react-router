import { FC, useCallback } from 'react'
import { LocationCard } from './components/LocationCard/LocationCard'
import { useSearchParams } from 'react-router-dom'
import locationService from '../../api/locationService'
import { ILocationInfo } from '../../shared/models/location'
import { useInfinityScroll } from '../../hooks/useInfinityScroll'
import { Flex, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

export const Locations: FC = () => {

    const fetchLocations = useCallback(async (page: number): Promise<ILocationInfo[]> => {
        try {
            const response = await locationService.getAllFromPage(page);
        if (!response) return [];
            return response.data.results;
        } catch (error) {
            console.error('Error fetching characters:', error);
            return [];
        }
    }, []);

    const { items, isLoading, hasMore, error, triggerRef } = useInfinityScroll<ILocationInfo>(fetchLocations);

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
        <Flex vertical gap=".5rem">
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
                .map(location => (
                    <LocationCard key={location.id} {...location}/>
                ))
            }
            <div ref={triggerRef} style={{ height: '20px' }} />
            {isLoading && <Spin indicator={<LoadingOutlined spin />} size="large" />}
            {!hasMore && !isLoading && (
                <div>No more locations to load.</div>
            )}
        </Flex>
    )
}
