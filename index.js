const fs = require("fs");

const fileName = process.argv[2];

const file = fs.readFileSync(fileName, { encoding: "ascii" });

const data = file.split("\n");
data.pop();

const [d, i, s, v, f] = data.shift().split(" ");

const streets = [];
const cars = [];

const inter = {};

for (let i = 0; i < s; i++) {
  const [b, e, name, l] = data.shift().split(" ");
  streets.push({ b, e, name, l });
  inter[e] = inter[e] ? inter[e].concat(name) : [name];
}
for (let i = 0; i < v; i++) {
  const [p, ...path] = data.shift().split(" ");
  cars.push({ p, path });
}

// console.log(d, i, s, v, f, streets, cars);

// console.log({ inter });

console.log(Object.keys(inter).length);
for (const i in inter) {
  console.log(i);
  console.log(inter[i].length);
  inter[i].forEach((s) => console.log(s, 1));
}
