const infos = [
  { tags: ["Politics"] },
  { tags: ["Politics"] },
  { tags: ["E-sports", "Space", "Technology"] },
  { tags: ["North America", "Politics"] },
  { tags: [] },
  { tags: ["North America", "Politics"] },
  { tags: ["North America", "Politics"] },
  { tags: ["North America", "Politics"] },
  { tags: ["Democracy", "Politics"] },
  { tags: ["Elections", "Politics"] },
  { tags: ["Crypto"] },
  { tags: ["Elections", "Governance", "Politics"] },
  { tags: ["Crypto"] },
  { tags: ["Crypto"] },
  { tags: ["Democracy", "Politics"] },
  {
    tags: [
      "COVID-19",
      "China",
      "Crypto",
      "Democracy",
      "North America",
      "Politics",
    ],
  },
  { tags: [] },
  { tags: ["COVID-19"] },
  { tags: ["Space", "Technology"] },
  { tags: ["Politics"] },
];

const tests = [{ tags: ["1"] }, { tags: ["1", "2"] }, { tags: [] }];

async function main() {
  let i = 0;
  const res = infos.reduce((arr, curr) => {
    if (curr.tags.length === 0) {
      i++;
    }
    curr.tags.forEach((index) => {
      if (!arr.has(index)) {
        arr.set(index, 1);
      } else {
        arr.set(index, Number(arr.get(index)) + 1);
      }
    });
    return arr;
  }, new Map());
  res.set("Others", i);
  console.log(res);
}

main().catch((error) => {
  console.log("ERROR");
  console.log(error);
});
