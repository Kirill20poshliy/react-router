export interface IInfo {
    count: number,
    pages: number,
    next: string,
    prev: string,
}

export interface IPage<T> {
    info: IInfo,
    results: T[]
}