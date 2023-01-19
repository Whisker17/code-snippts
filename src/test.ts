import fetch from "node-fetch";

async function main() {
  /**
   * Fetching asset indexes works with both rpc and indexer mode.
   */

  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=zeitgeist&vs_currencies=usd&include_24hr_change=true`
  ).then((response: any) => {
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
    // return {
    //   price: response.json().zeitgeist.usd,
    //   change: response.json().zeitgeist.usd_24h_change,
    // };
  });

  console.log(res);
}

main().catch((error) => {
  console.log("ERROR");
  console.log(error);
});
