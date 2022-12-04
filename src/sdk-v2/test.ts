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

async function main() {
  const tagsMap = Array.from(
    infos
      .reduce((arr, curr) => {
        curr.tags.forEach((index) => {
          if (!arr.has(index)) {
            if (index == "") {
              arr.set("Others", 1);
            } else {
              arr.set(index, 1);
            }
          } else {
            arr.set(index, Number(arr.get(index)) + 1);
          }
          return arr;
        });
      }, new Map())
      .tags.values()
  );

  console.log(tagsMap);
}

main().catch((error) => {
  console.log("ERROR");
  console.log(error);
});
