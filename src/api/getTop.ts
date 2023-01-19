import axios from "axios";

export const getTop = async () => {
  const result = await axios.post("https://processor.zeitgeist.pm/graphql", {
    query: `query TimeBasedVolume {
      historicalPools(
        where: {
          volume_gt: "0"
          event_contains: "Swap"
          timestamp_gt: "2022-11-18T00:00:00Z"
          timestamp_lt: "2022-12-25T00:00:00Z"
        }
        orderBy: poolId_DESC
      ) {
        poolId
        dVolume
        timestamp
      }
    }`,
  });

  return Array.from(
    result.data.data.historicalPools.reduce(
      (pool, { poolId, dVolume }) =>
        pool.set(poolId, (pool.get(poolId) || 0) + Number(dVolume)),
      new Map()
    ),
    ([poolId, dVolume]) => ({ poolId, dVolume })
  ).sort((a, b) => b.dVolume - a.dVolume);
};

async function main() {
  /**
   * Fetching asset indexes works with both rpc and indexer mode.
   */
  const res = await getTop();

  console.log(res);
}

main().catch((error) => {
  console.log("ERROR");
  console.log(error);
});
