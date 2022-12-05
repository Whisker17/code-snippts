import { gql, GraphQLClient } from "graphql-request";
import { ZEITGEIST_GQL_URL } from "../const";

const poolVolumeQuery = gql`
  query poolVolumeQuery {
    markets(where: { status_eq: "Active" }) {
      tags
    }
  }
`;

export const getActiveTagsCount = async (client: GraphQLClient) => {
  const response = await client.request<{
    markets: {
      tags: string[];
    }[];
  }>(activeTagsQuery);

  return response.markets;
};

async function main() {
  /**
   * Fetching asset indexes works with both rpc and indexer mode.
   */
  const endPoint = new GraphQLClient(ZEITGEIST_GQL_URL);
  const res = await getActiveTagsCount(endPoint);

  console.log(res);

  let i = 0;
  const tagsMap = res.reduce((arr, curr) => {
    if (curr.tags.length === 0) {
      i++;
    }
    curr.tags.forEach((index) => {
      if (!arr.has(index)) {
        arr.set(index, 1);
      } else {
        arr.set(index, Number(arr.get(index)) + 1);
      }
    });
    return arr;
  }, new Map());
  tagsMap.set("Others", i);
  console.log(tagsMap);
}

main().catch((error) => {
  console.log("ERROR");
  console.log(error);
});
