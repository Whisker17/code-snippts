import fetch from "node-fetch";

const fetchTransactionsCount = (): Promise<number> => {
  return fetch(`https://zeitgeist.api.subscan.io/api/scan/metadata`, {
    headers: {
      "x-api-keys": String("597819365d984673938c35c37f35b9c2"),
    },
  })
    .then((response: Response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return 0;
    });
};

async function main() {
  /**
   * Fetching asset indexes works with both rpc and indexer mode.
   */
  const res = await fetchTransactionsCount();

  console.log(res);
}

main().catch((error) => {
  console.log("ERROR");
  console.log(error);
});
