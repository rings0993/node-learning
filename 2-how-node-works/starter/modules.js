// console.log(arguments);
// console.log(require("module").wrapper);

const C = require("./module-test-1");
const calc1 = new C();
console.log(calc1.add(1, 5));

const calc2 = require("./module-test-2");
console.log(calc2.add(2, 5));

require("./module-test-3")();
require("./module-test-3")();
require("./module-test-3")();
