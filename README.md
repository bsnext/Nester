# Nester
Short library for transform objects with "raw-string" keys.

```
{ "object.raw.string": "key" } -> { object: { raw: { string: "key" } } }
{ "my.array[2]": "hehe" } -> { my: { array: [undefined, undefined, "hehe"] } }
```

## Installing:
```bash
npm install @bsnext/nester
```

## Usage:
```ts
new Nester(isCaching: boolean = false, cacheLimit: number = 100, cachePurgeTime: number = 300000)
```

* isCaching - State of cache mode for store parsed keys.
* cacheLimit - Limit of cached keys. Cache will purged when reach limit keys.
* cachePurgeTime - Interval (ms) for purge cache.

```ts
import Nester from "@bsnext/nester";
const nester = new Nester(true);

const result = nester.transform(
    { "object.raw.string": "key" }
);

// Result: { object: { raw: { string: "key" } }
// PS. We recommended to use caching. See benchmark on this page.
```

## Examples:
```ts
nester.transform(
    {
        "hui.asdsad.asdsd": {
            "elda": 123,
            "pizda[2]": "da",
            "pizda[3]": {
                "moshonka.po.imeni[0]": "sanya", 
                "moshonka.po.imeni[1]": "sasanya",
                "moshonka.po.imeni[3]": "POEsher",
            }
        },
        "buba.biba": true,
        "bruh": null,
        "keka.ebeka[1]": true,
        "keka.ebeka[5]": {
            bekabeka: 123123.123
        },
    }    
);

/*
Result:
{
    "hui": {
        "asdsad": {
            "asdsd": {
                "elda": 123,
                "pizda": [undefined, undefined, "da",
                    {
                        "moshonka": {
                            "po": {
                                "imeni": ["sanya", "sasanya", undefined, "POEsher"]
                            }
                        }
                    }
                ]
            }
        }
    },
    "buba": {
        "biba": true
    },
    "bruh": null,
    "keka": {
        "ebeka": [true, true, false, undefined, undefined,
            {
                "bekabeka": 123123.123
            }
        ]
    }
}
*/
```

```ts
type exampleType = {
    my: {
        deep: {
            variable: {
                hello: string;
                version: string;
            }
        }
    }
}

const myObject = nester.transform<exampleType>(
    {
        "my.deep.variable": {
            "hello": "world",
            "version": "1.1.0"
        }
    }    
);
```

```ts
nester.purge();  // Method for manually purge cache.
```

## Benchmark:
[Used code for test and get those results.](https://github.com/bsnext/Nester/blob/main/src/benchmark/index.ts)

```
[No Cache] Hard & Deep Object: x100000 / 1996.83 ms.
[No Cache] Object + Array: x100000 / 908.87 ms.
[No Cache] Deep Object: x100000 / 1385.89 ms.
[Cache] Hard & Deep Object: x100000 / 193.69 ms.
[Cache] Object + Array: x100000 / 82.66 ms.
[Cache] Deep Object: x100000 / 157.80 ms.
```

Tested on Node.JS v20.11.1, Ryzen 7 3800X 3.9 GHz