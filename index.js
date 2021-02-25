const fs = require("fs");

const fileName = process.argv[2];

const file = fs.readFileSync(fileName, { encoding: "ascii" });

const data = file.split("\n");
data.pop();

const [d, i, s, v, f] = data.shift().split(" ");

const streets = [];
const cars = [];

const inter = {};
const streetsObj = {};
const streetsObjByTime = {};

for (let i = 0; i < s; i++) {
  const [b, e, name, l] = data.shift().split(" ");
  streets.push({ b, e, name, l });
  inter[e] = inter[e] ? inter[e].concat(name) : [name];
}
for (let i = 0; i < v; i++) {
  const [p, ...path] = data.shift().split(" ");
  cars.push({ p, path });
  path.forEach((s, order) => {
    streetsObj[s] = streetsObj[s] ? streetsObj[s] + 1 : 1;
    if (!streetsObjByTime[s]) {
      streetsObjByTime[s] = {};
    }
    streetsObjByTime[s][order] = streetsObjByTime[s][order]
      ? streetsObjByTime[s][order] + 1
      : 1;
  });
}

// console.log(d, i, s, v, f, streets, cars);

// console.log({ streetsObj, streetsObjByTime });

// const arr = Object.keys(streetsObjByTime)
//   .filter((s) => streetsObjByTime[s]["0"])
//   .sort((a, b) => {
//     return streetsObjByTime[b]["0"] - streetsObjByTime[a]["0"] || 0;
//   });

// arr.forEach((s) => {
//   console.log(s, streetsObjByTime[s]);
// });

let interCount = 0;
for (const i in inter) {
  const newInter = inter[i].filter((s) => streetsObj[s]);
  if (newInter.length) {
    interCount++;
  }
}

console.log(interCount);
let a = true;
for (const i in inter) {
  const newInter = inter[i].filter((s) => streetsObj[s]);
  if (newInter.length) {
    console.log(i);
    console.log(newInter.length);
    newInter
      .sort((a, b) => streetsObj[b] - streetsObj[a])
      .forEach((s) => {
        const sec = Math.max(
          Math.floor(streetsObj[s] / newInter.length),
          Math.floor(Math.random() * 2 + 1)
        );
        console.log(s, sec);
      });
  }
}
