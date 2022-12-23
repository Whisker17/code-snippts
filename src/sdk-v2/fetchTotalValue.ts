import { create, mainnetIndexer } from "@zeitgeistpm/sdk-next";
import Decimal from "decimal.js";

async function main() {
  /**
   * Fetching asset indexes works with both rpc and indexer mode.
   */
  const sdk = await create(mainnetIndexer());

  /**
   * Fetch a set of pools.
   */
  const pools = await sdk.model.swaps.listPools({});
  const saturatedIndex = await sdk.model.swaps.saturatedPoolsIndex(pools);
  console.log("Pools:", pools);

  const total =
    pools?.reduce((acc, pool) => {
      const saturatedData = saturatedIndex?.[pool.poolId];
      if (
        saturatedData &&
        saturatedData.market.status === "Active" &&
        saturatedData.liquidity
      ) {
        console.log("/nPool: ", pool.poolId);

        console.log("Index: ", saturatedData.liquidity);
        return acc.plus(saturatedData.liquidity);
      }
      return acc;
    }, new Decimal(0)) ?? new Decimal(0);

  console.log(total.toNumber);
}

main().catch((error) => {
  console.log("ERROR");
  console.log(error);
});
