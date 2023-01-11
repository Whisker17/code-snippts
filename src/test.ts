import fetch from "node-fetch";

export interface TokenInfos {
  price: string;
  price_change: string;
  total_issuance: number;
  free_balance: number;
  available_balance: number;
  locked_balance: number;
  reserved_balance: number;
  bonded_locked_balance: number;
  democracy_locked_balance: number;
  vesting_balance: number;
}

const fetchTokenInfos = (): Promise<TokenInfos> => {
  const token: TokenInfos = {} as TokenInfos;
  return fetch(`https://zeitgeist.api.subscan.io/api/scan/token`, {
    headers: {
      "x-api-keys": String("597819365d984673938c35c37f35b9c2"),
    },
  })
    .then((response: any) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .then((response) => {
      const ztg = response.data.detail.ZTG;
      token.price = ztg.price;
      token.price_change = ztg.price_change;
      token.total_issuance = Number(ztg.total_issuance) / 10 ** 10;
      token.free_balance = Number(ztg.free_balance) / 10 ** 10;
      token.available_balance = Number(ztg.available_balance) / 10 ** 10;
      token.locked_balance = Number(ztg.locked_balance) / 10 ** 10;
      token.reserved_balance = Number(ztg.reserved_balance) / 10 ** 10;
      token.bonded_locked_balance =
        Number(ztg.bonded_locked_balance) / 10 ** 10;
      token.democracy_locked_balance =
        Number(ztg.democracy_locked_balance) / 10 ** 10;
      token.vesting_balance = Number(ztg.vesting_balance) / 10 ** 10;
      return response.data.count_transfer;
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

  const res = await fetchTokenInfos();

  console.log(res);
}

main().catch((error) => {
  console.log("ERROR");
  console.log(error);
});
