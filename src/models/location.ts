import { IPage } from "./info";

export interface ILocationInfo {
    id: number,
    name: string,
    type: string,
    dimension: string,
    residents: string[],
    url: string,
    created: string
}

export interface ILocationsPage extends IPage<ILocationInfo> {}