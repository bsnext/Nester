"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uvu_1 = require("uvu");
const assert = require("uvu/assert");
const __1 = require("..");
const nester = new __1.default();
(0, uvu_1.test)('Simple object #1', () => {
    const result = nester.transform({
        "varname": "varvalue"
    });
    assert.is(result.varname, "varvalue");
});
uvu_1.test.run();
//# sourceMappingURL=simple.js.map