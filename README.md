# Nester
Short library for transform objects with "raw-string" keys.

```
{ "object.raw.string": "key" } -> { object: { raw: { string: "key" } } }
{ "my.array[2]": "hehe" } -> { my: { array: [undefined, undefined, "hehe"] } }
```

## Usage:
```ts
import Nester from "?";
const caching = false;
const nester = new Nester(caching); // Caching is a optional argument to save parsed keys in memory re-use. Default 'false: boolean'. 
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

## Benchmark:
[Used code for test and get those results.](https://github.com/bsnext/Nester/blob/main/src/benchmark/index.ts)
```
[No Cache] Hard & Deep Object: x100000 / 1928.32 ms.
[No Cache] Object + Array: x100000 / 1028.10 ms.
[No Cache] Deep Object: x100000 / 1442.90 ms.
[Cache] Hard & Deep Object: x100000 / 198.60 ms.
[Cache] Object + Array: x100000 / 81.33 ms.
[Cache] Deep Object: x100000 / 171.70 ms.
```