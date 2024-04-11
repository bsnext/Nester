const parseKey = function (key: string) {
    return key.split('.').map(segment => {
        if (segment.includes('[')) {
            let bracketPos = segment.indexOf('[');
            let arrayIndex = parseInt(segment.substring(bracketPos + 1, segment.length - 1), 10);
            let keyName = segment.substring(0, bracketPos);
            return [keyName, arrayIndex];
        }

        return segment;
    }).flat();
};

const isArray = Array.isArray;

////////////////////////////////

export default class Nester {
    private isCaching: boolean;
    private cacheSize: number;
    private cacheLimit: number;
    private cache: { [index: string]: (string | number)[]; };

    constructor(isCaching: boolean = false, cacheLimit: number = 100, cachePurgeTime: number = 60000 * 5) {
        this.isCaching = isCaching;
        this.cacheLimit = cacheLimit;
        this.cacheSize = 0;
        this.cache = {};

        setInterval(this.purge, cachePurgeTime);
    }

    transform<T>(response: { [key: string | number]: any; }) {
        let result = {};

        for (let key in response) {
            if (key === undefined || !response.hasOwnProperty(key)) {
                continue;
            }

            let value = response[key];

            if (value !== null && typeof value === 'object' && !isArray(value)) {
                response[key] = this.transform(value);
            }

            let path, cache = this.cache;

            if (this.isCaching) {
                path = cache[key];

                if (!path) {
                    if (this.cacheSize >= this.cacheLimit) {
                        this.cacheSize = 1;
                        cache = this.cache = {};
                    } else {
                        this.cacheSize = this.cacheSize + 1;
                    }

                    path = cache[key] = parseKey(key);
                }
            } else {
                path = parseKey(key);
            }

            let current = result;
            let pathLength = path.length;

            for (let i = 0; i < pathLength; i++) {
                let segment = path[i];
                let isLastSegment = i === pathLength - 1;

                if (typeof segment === 'number') {
                    if (!current[segment]) {
                        if (!isArray(current)) {
                            current = [];
                        }
                        current[segment] = isLastSegment ? response[key] : {};
                    }
                } else {
                    if (!current[segment]) {
                        if (isLastSegment) {
                            current[segment] = response[key];
                        } else {
                            if (typeof path[i + 1] === 'number') {
                                current[segment] = [];
                            } else {
                                current[segment] = {};
                            }
                        }
                    }
                }

                current = current[segment];
            }
        }

        return result as T;
    }

    purge() {
        this.cacheSize = 0;
        this.cache = {};
    }
}