import { gql, GraphQLClient } from "graphql-request";
import { ZEITGEIST_GQL_URL } from "../const";

const totalTagsQuery = gql`
  query totalTagsQuery {
    markets {
      tags
    }
  }
`;

export const getTotalTagsCount = async (client: GraphQLClient) => {
  const response = await client.request<{
    markets: {
      tags: string[];
    }[];
  }>(totalTagsQuery);

  return response.markets;
};

async function main() {
  /**
   * Fetching asset indexes works with both rpc and indexer mode.
   */
  const endPoint = new GraphQLClient(ZEITGEIST_GQL_URL);
  const res = await getTotalTagsCount(endPoint);

  console.log(res);

  let i = 0;
  const tagsMap = res.reduce((arr, curr) => {
    if (curr.tags === null || curr.tags.length === 0) {
      i++;
    } else {
      curr.tags.forEach((index) => {
        if (!arr.has(index)) {
          arr.set(index, 1);
        } else {
          arr.set(index, Number(arr.get(index)) + 1);
        }
      });
    }

    return arr;
  }, new Map());
  tagsMap.set("Others", i);
  console.log(tagsMap);
}

main().catch((error) => {
  console.log("ERROR");
  console.log(error);
});
