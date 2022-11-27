import { create, mainnetIndexer } from "@zeitgeistpm/sdk";

async function main() {
  /**
   * Fetching asset indexes works with both rpc and indexer mode.
   */
  const sdk = await create(mainnetIndexer());

  /**
   * Fetch a set of pools.
   */
  const markets = await sdk.context.indexer.marketStatusCount({
    status: "Active",
  });

  console.log(markets);
}

main().catch((error) => {
  console.log("ERROR");
  console.log(error);
});
