export default class Nester {
    private isCaching;
    private cache;
    constructor(isCaching?: boolean);
    transform(response: {
        [key: string | number]: any;
    }): {};
}
