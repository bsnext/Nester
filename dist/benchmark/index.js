"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
{
    const nester = new __1.default();
    const startTime = performance.now();
    for (let i = 0; i < 100000; i++) {
        nester.transform({
            "hui.asdsad.asdsd": {
                elda: 123,
                "pizda[2]": "da",
                "pizda[3]": {
                    "moshonka.po.imeni[0]": "sanya",
                    "moshonka.po.imeni[1]": "sasanya",
                    "moshonka.po.imeni[3]": "POEsher",
                }
            },
            "buba.biba": true,
            "bruh": null,
            "keka.ebeka[0]": true,
            "keka.ebeka[1]": true,
            "keka.ebeka[2]": false,
            "keka.ebeka[5]": {
                bekabeka: 123123.123
            },
        });
    }
    console.log(`[No Cache] Hard & Deep Object: x100000 / ${(performance.now() - startTime).toFixed(2)} ms.`);
}
{
    const nester = new __1.default();
    const startTime = performance.now();
    for (let i = 0; i < 100000; i++) {
        nester.transform({
            "keka.ebeka[0]": true,
            "keka.ebeka[1]": null,
            "keka.ebeka[2]": false,
            "keka.ebeka[3]": [12, 12, 3, 123],
            "keka.ebeka[4]": "oh my string...",
            "keka.ebeka[5]": {
                bekabeka: 123123.123
            },
        });
    }
    console.log(`[No Cache] Object + Array: x100000 / ${(performance.now() - startTime).toFixed(2)} ms.`);
}
{
    const nester = new __1.default();
    const startTime = performance.now();
    for (let i = 0; i < 100000; i++) {
        nester.transform({
            "keka.ebeka.bruh": true,
            "keka.ebeka.my.deep.boolean": null,
            "keka.ebeka.my.oneMore.deep.boolean": false,
            "keka.ebeka.my.oneMore.deep.string1": "asdsad",
            "keka.no_ebeka.my.oneMore.deep.string2": "arg",
            "keka.no_ebeka.my.oneMore.deep.string3": "sadads",
            "keka.no_ebeka.less.deep.string": "sanya lashara",
            "keka.no_ebeka.less.deep.array": []
        });
    }
    console.log(`[No Cache] Deep Object: x100000 / ${(performance.now() - startTime).toFixed(2)} ms.`);
}
{
    const nester = new __1.default(true);
    const startTime = performance.now();
    for (let i = 0; i < 100000; i++) {
        nester.transform({
            "hui.asdsad.asdsd": {
                elda: 123,
                "pizda[2]": "da",
                "pizda[3]": {
                    "moshonka.po.imeni[0]": "sanya",
                    "moshonka.po.imeni[1]": "sasanya",
                    "moshonka.po.imeni[3]": "POEsher",
                }
            },
            "buba.biba": true,
            "bruh": null,
            "keka.ebeka[0]": true,
            "keka.ebeka[1]": true,
            "keka.ebeka[2]": false,
            "keka.ebeka[5]": {
                bekabeka: 123123.123
            },
        });
    }
    console.log(`[Cache] Hard & Deep Object: x100000 / ${(performance.now() - startTime).toFixed(2)} ms.`);
}
{
    const nester = new __1.default(true);
    const startTime = performance.now();
    for (let i = 0; i < 100000; i++) {
        nester.transform({
            "keka.ebeka[0]": true,
            "keka.ebeka[1]": null,
            "keka.ebeka[2]": false,
            "keka.ebeka[3]": [12, 12, 3, 123],
            "keka.ebeka[4]": "oh my string...",
            "keka.ebeka[5]": {
                bekabeka: 123123.123
            },
        });
    }
    console.log(`[Cache] Object + Array: x100000 / ${(performance.now() - startTime).toFixed(2)} ms.`);
}
{
    const nester = new __1.default(true);
    const startTime = performance.now();
    for (let i = 0; i < 100000; i++) {
        nester.transform({
            "keka.ebeka.bruh": true,
            "keka.ebeka.my.deep.boolean": null,
            "keka.ebeka.my.oneMore.deep.boolean": false,
            "keka.ebeka.my.oneMore.deep.string1": "asdsad",
            "keka.no_ebeka.my.oneMore.deep.string2": "arg",
            "keka.no_ebeka.my.oneMore.deep.string3": "sadads",
            "keka.no_ebeka.less.deep.string": "sanya lashara",
            "keka.no_ebeka.less.deep.array": []
        });
    }
    console.log(`[Cache] Deep Object: x100000 / ${(performance.now() - startTime).toFixed(2)} ms.`);
}
//# sourceMappingURL=index.js.map