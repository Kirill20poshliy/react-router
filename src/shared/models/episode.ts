import { IPage } from "./info"

export interface IEpisode {
    id: number,
    name: string,
    air_date: string,
    episode: string,
    characters: string[],
    url: string,
    created: string
}

export interface IEpisodesPage extends IPage<IEpisode> {}