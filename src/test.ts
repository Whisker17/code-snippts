const input = [
  { tags: ["Politics"] },
  { tags: ["Politics"] },
  { tags: ["E-sports", "Space", "Technology"] },
  { tags: ["North America", "Politics"] },
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

async function main() {
  var res = input.reduce((acc, curr) => {
    curr.tags.forEach((value) => {
      acc.push({ tag: value, count: 1 });
    });
  }, new Array());
  console.log(res);
}

main().catch((error) => {
  console.log("ERROR");
  console.log(error);
});
