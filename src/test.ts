const data = [
  { tag: "Politics", count: 12 },
  { tag: "E-sports", count: 2 },
  { tag: "Space", count: 1 },
  { tag: "Technology", count: 1 },
  { tag: "North America", count: 5 },
  { tag: "Democracy", count: 3 },
  { tag: "Elections", count: 2 },
  { tag: "Crypto", count: 4 },
  { tag: "Governance", count: 1 },
  { tag: "COVID-19", count: 1 },
  { tag: "China", count: 1 },
  { tag: "Others", count: 3 },
];

async function main() {
  data.splice(
    data.findIndex((item) => item.tag === "Others"),
    1
  );
  console.log(data);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
