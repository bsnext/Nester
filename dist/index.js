"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseKey = function (key) {
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
const hasOwn = Object.hasOwn;
class Nester {
    isCaching;
    cacheSize;
    cacheLimit;
    cache;
    constructor(isCaching = false, cacheLimit = 100, cachePurgeTime = 60000 * 5) {
        this.isCaching = isCaching;
        this.cacheLimit = cacheLimit;
        this.cacheSize = 0;
        this.cache = {};
        if (isCaching) {
            setInterval(this.purge.bind(this), cachePurgeTime);
        }
    }
    transform(response) {
        let result = {};
        for (let key in response) {
            if (key === undefined || !hasOwn(response, key)) {
                continue;
            }
            let value = response[key];
            if (value !== null && typeof value === 'object' && !isArray(value) && !(value instanceof Date)) {
                response[key] = this.transform(value);
            }
            let path, cache = this.cache;
            if (this.isCaching) {
                path = cache[key];
                if (!path) {
                    if (this.cacheSize >= this.cacheLimit) {
                        this.cacheSize = 1;
                        cache = this.cache = {};
                    }
                    else {
                        this.cacheSize = this.cacheSize + 1;
                    }
                    path = cache[key] = parseKey(key);
                }
            }
            else {
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
                }
                else {
                    if (!current[segment]) {
                        if (isLastSegment) {
                            current[segment] = response[key];
                        }
                        else {
                            if (typeof path[i + 1] === 'number') {
                                current[segment] = [];
                            }
                            else {
                                current[segment] = {};
                            }
                        }
                    }
                }
                current = current[segment];
            }
        }
        return result;
    }
    purge() {
        if (!this.isCaching) {
            throw new Error("Nester caching is not enabled, .purge() method not available.");
        }
        this.cacheSize = 0;
        this.cache = {};
    }
}
exports.default = Nester;
//# sourceMappingURL=index.js.map