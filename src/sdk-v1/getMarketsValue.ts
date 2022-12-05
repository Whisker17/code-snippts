import axios from "axios";
import { ZEITGEIST_GQL_URL } from "../const";

/**
 * @param marketId market identifier
 * @returns [[Market]] for specified identifier
 */

async function main() {
  // Initialise the provider to connect to the local node
  // wss://bsr.zeitgeist.pm
  // wss://bp-rpc.zeitgeist.pm
  console.time("test");

  const result = await axios.post(ZEITGEIST_GQL_URL, {
    query: `query getTVL {
        pools(where: {poolStatus_not_eq: "Closed"}) {
          marketId
          poolId
          volume
          ztgQty
        }
      }`,
  });
  let ztgQtyAmount = Number(0);
  let volumeAmout = Number(0);
  let assetsAmount = Number(0);
  let marketCount = 0;
  for await (const index of result.data.data.pools) {
    ztgQtyAmount += Number(index.ztgQty / 1e10);
    volumeAmout += Number(index.volume / 1e10);
    let marketidString = "[" + index.marketId + ",";
    let query = `query getAssets($MARKET_ID: String ) {
      assets(where: {assetId_contains: $MARKET_ID}) {
        assetId
        amountInPool
        price
      }
    }`;
    const assets = await axios.post(
      ZEITGEIST_GQL_URL,
      {
        query: query,
        variables: {
          MARKET_ID: marketidString,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let assetsCount = Number(0);
    for (let assetsIndex of assets.data.data.assets) {
      assetsCount += Number(
        Number(assetsIndex.amountInPool * assetsIndex.price)
      );
    }
    assetsAmount += Number(assetsCount / 1e10);
    marketCount++;
  }
  console.log("Market Count: ", marketCount);
  console.log("\nTotal ZTG amount:", ztgQtyAmount);
  console.log("\nTotal Volume amount:", volumeAmout);
  console.log("\nTotal Assets amount:", assetsAmount);
  console.timeEnd("test");
}

main()
  .catch(console.error)
  .finally(() => process.exit());
