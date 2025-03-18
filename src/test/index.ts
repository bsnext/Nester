import { test } from 'uvu';
import * as assert from 'uvu/assert';

////////////////////////////////

import Nester from '..';
const nester = new Nester();

////////////////////////////////

test('Simple Test #1 (String)', () => {
    const result: any = nester.transform({
        "varname": "varvalue"
    });

    assert.is(result.varname, "varvalue");
});

test('Simple Test #2 (Number)', () => {
    const result: any = nester.transform({
        "varname": 123
    });

    assert.is(result.varname, 123);
});

test('Simple Test #3 (Arrays)', () => {
    const result: any = nester.transform({
        "arrayEmpty": [],
        "arrayWithElements": [1, 2, 3]
    });

    assert.equal(result,
        {
            "arrayEmpty": [],
            "arrayWithElements": [1, 2, 3]
        }
    );
});

test('Simple Test #4 (Objects)', () => {
    const result: any = nester.transform({
        "objectEmpty": {},
        "objectWithElements": {
            firstKey: 228,
            secondKey: "L33T"
        }
    });

    assert.equal(result,
        {
            "objectEmpty": {},
            "objectWithElements": {
                firstKey: 228,
                secondKey: "L33T"
            }
        }
    );
});

test('Simple Test #5 (Few Types / Shuffle)', () => {
    const result: any = nester.transform({
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

    assert.equal(result,
        {
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
        }
    );
});

test('Simple Test #6 (Date)', () => {
    const result: any = nester.transform({
        "something.date": new Date('2025-03-10T15:30:00Z')
    });

    assert.equal(
        result,
        {
            something: {
                date: new Date('2025-03-10T15:30:00Z')
            }
        }
    );
});

////////////////////////////////

test('Normal Test #1 (Few Types / Shuffle)', () => {
    const result: any = nester.transform({
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

    assert.equal(result,
        {
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
        }
    );
});

test('Normal Test #2 (Few Types / Shuffle)', () => {
    const result: any = nester.transform({
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

    assert.equal(result,
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
    );
});

////////////////////////////////

test.run();