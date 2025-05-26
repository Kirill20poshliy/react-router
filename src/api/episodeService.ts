import { AxiosError } from "axios"
import { api } from "./api"
import { IEpisode, IEpisodesPage } from "../models/episode"

class EpisodeService {
    async getAllFromPage(page: number) {
        try {
            return await api.get<IEpisodesPage>(`/episode?page=${page}`)
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
            const result = await api.get<IEpisode>(`/episode/${id}`)
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

export default new EpisodeService()