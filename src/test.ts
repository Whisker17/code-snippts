import fetch from "node-fetch";

export interface APPCounts {
  message: { count: number; date: string }[];
}

export interface APPCountsChart {
  message: { start: string; end: string; count: number }[];
}

const fetchAPPCounts = (name: string): Promise<APPCounts> => {
  return fetch(`https://pro-api.zeitgeist.pm/api/${name}`)
    .then((response: Response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .catch((error) => {
      console.log(error);
      return 0;
    });
};

async function main() {
  const res = fetchAPPCounts("trades");
  console.log(res);
}

main().catch((error) => {
  console.log("ERROR");
  console.log(error);
});
