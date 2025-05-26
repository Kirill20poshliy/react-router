import { AxiosError } from "axios"
import { api } from "./api"
import { ICharacter, ICharactersPage } from "../models/character"

class CharacterService {
    async getAllFromPage(page: number) {
        try {
            return await api.get<ICharactersPage>(`/character?page=${page}`)
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
            const result = await api.get<ICharacter>(`/character/${id}`)
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

export default new CharacterService()