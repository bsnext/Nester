"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uvu_1 = require("uvu");
const assert = require("uvu/assert");
const __1 = require("..");
const nester = new __1.default();
(0, uvu_1.test)('Simple Test #1 (String)', () => {
    const result = nester.transform({
        "varname": "varvalue"
    });
    assert.is(result.varname, "varvalue");
});
(0, uvu_1.test)('Simple Test #2 (Number)', () => {
    const result = nester.transform({
        "varname": 123
    });
    assert.is(result.varname, 123);
});
(0, uvu_1.test)('Simple Test #3 (Arrays)', () => {
    const result = nester.transform({
        "arrayEmpty": [],
        "arrayWithElements": [1, 2, 3]
    });
    assert.equal(result, {
        "arrayEmpty": [],
        "arrayWithElements": [1, 2, 3]
    });
});
(0, uvu_1.test)('Simple Test #4 (Objects)', () => {
    const result = nester.transform({
        "objectEmpty": {},
        "objectWithElements": {
            firstKey: 228,
            secondKey: "L33T"
        }
    });
    assert.equal(result, {
        "objectEmpty": {},
        "objectWithElements": {
            firstKey: 228,
            secondKey: "L33T"
        }
    });
});
(0, uvu_1.test)('Simple Test #5 (Few Types / Shuffle)', () => {
    const result = nester.transform({
        "objectEmpty": {},
        "arrayEmpty": [],
        "arrayWithElements": [1, 2, 3],
        "objectWithElements": {
            firstKey: 228,
            secondKey: "L33T"
        },
        "varnameString": "my_string",
        "varnameNumber": 1488,
        "varnameNull": null,
        "varnameNaN": NaN,
        "varnameUndefined": undefined
    });
    assert.equal(result, {
        "objectEmpty": {},
        "arrayEmpty": [],
        "arrayWithElements": [1, 2, 3],
        "objectWithElements": {
            firstKey: 228,
            secondKey: "L33T"
        },
        "varnameString": "my_string",
        "varnameNumber": 1488,
        "varnameNull": null,
        "varnameNaN": NaN,
        "varnameUndefined": undefined
    });
});
(0, uvu_1.test)('Normal Test #1 (Few Types / Shuffle)', () => {
    const result = nester.transform({
        "rootvar": "varvalue",
        "varname.firstChild": "othervalue",
        "varname.secondChild.oneMoreChild": "againothervalue",
        "varname.secondChild.twoMoreChild": 4554,
        "varname.secondChild.threeMoreChild": true,
        "varname.thirdChild": {
            key: NaN,
            "included.number": 4848,
            "included.array": [3, 4, 5]
        },
    });
    assert.equal(result, {
        "rootvar": "varvalue",
        "varname": {
            "firstChild": "othervalue",
            "secondChild": {
                "oneMoreChild": "againothervalue",
                "twoMoreChild": 4554,
                "threeMoreChild": true
            },
            "thirdChild": {
                "key": NaN,
                "included": {
                    "number": 4848,
                    "array": [3, 4, 5]
                }
            }
        }
    });
});
(0, uvu_1.test)('Normal Test #2 (Few Types / Shuffle)', () => {
    const result = nester.transform({
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
    assert.equal(result, {
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
    });
});
uvu_1.test.run();
//# sourceMappingURL=index.js.map