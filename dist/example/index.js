"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const nester = new __1.default();
const rawObject = {
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
    "keka.ebeka[1]": true,
    "keka.ebeka[5]": {
        bekabeka: 123123.123
    },
};
const readyObject = nester.transform({
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
    "keka.ebeka[1]": true,
    "keka.ebeka[5]": {
        bekabeka: 123123.123
    },
});
console.log(JSON.stringify(readyObject));
//# sourceMappingURL=index.js.map