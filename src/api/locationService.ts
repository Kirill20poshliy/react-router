import { AxiosError } from "axios"
import { api } from "./api"
import { ILocationInfo, ILocationsPage } from "../models/location"

class LocationService {
    async getAllFromPage(page: number) {
        try {
            return await api.get<ILocationsPage>(`/location?page=${page}`)
        } catch (e) {
            if (e instanceof AxiosError)  {
                console.log(e.message)
            } else {
                console.log(e)
            }            
        }
    }

    async getOne(id: number | string) {
        try {
            const result = await api.get<ILocationInfo>(`/location/${id}`)
            if (!result) throw new Error('No response received');
            return result
        } catch (e) {
            if (e instanceof AxiosError)  {
                console.log(e.message)
            }
            throw e
        }

    }
}

export default new LocationService()