export default class Nester {
    private isCaching;
    private cacheSize;
    private cacheLimit;
    private cache;
    constructor(isCaching?: boolean, cacheLimit?: number, cachePurgeTime?: number);
    transform<T>(response: {
        [key: string | number]: any;
    }): T;
    purge(): void;
}
