import fetch from "node-fetch";
import FormData from "form-data";

export interface user {
  active: number;
  users: number;
  day: string;
  total?: number;
}

const fetchTransactionsCount = async (date: String): Promise<user[]> => {
  const user = new Array<user>();
  const d = new FormData();
  d.append("start", "2022-06-15");
  d.append("end", `${date}`);
  d.append("format", "day");
  d.append("category", "ActiveAccount");
  const active = await fetch(
    `https://zeitgeist.api.subscan.io/api/scan/daily`,
    {
      method: "POST",
      headers: {
        "x-api-keys": String("597819365d984673938c35c37f35b9c2"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: d,
    }
  )
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .then((response: any) => {
      response.data.list.forEach((value: any) => {
        user.push({
          day: value.time_utc.slice(0, 10),
          active: value.total,
          users: 0,
          total: 0,
        });
      });
      return user;
    })
    .catch((error) => {
      console.log(error);
      return new Array<user>();
    });

  const dd = new FormData();
  dd.append("start", "2022-06-15");
  dd.append("end", `${date}`);
  dd.append("format", "day");
  dd.append("category", "NewAccount");
  const newAccount = await fetch(
    `https://zeitgeist.api.subscan.io/api/scan/daily`,
    {
      method: "POST",
      headers: {
        "x-api-keys": String("597819365d984673938c35c37f35b9c2"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: dd,
    }
  )
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .then((response: any) => {
      response.data.list.forEach((value: any, index: number) => {
        active[index].users = value.total;
        if (index == 0) {
          active[index].total = value.total;
        } else {
          active[index].total = active[index - 1].total + value.total;
        }
      });
      return active;
    })
    .catch((error) => {
      console.log(error);
      return new Array<user>();
    });
  return newAccount;
};

async function main() {
  /**
   * Fetching asset indexes works with both rpc and indexer mode.
   */

  const yesterday = new Date(
    Date.now() -
      1 * 864e5 -
      new Date(Date.now() - 1 * 864e5).getTimezoneOffset() * 6e4
  )
    .toISOString()
    .split("T")[0];
  const res = await fetchTransactionsCount(yesterday);

  console.log(res);
}

main().catch((error) => {
  console.log("ERROR");
  console.log(error);
});
