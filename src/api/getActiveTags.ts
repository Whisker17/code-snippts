import { gql, GraphQLClient } from "graphql-request";
import { ZEITGEIST_GQL_URL } from "../const";

const activeTagsQuery = gql`
  query activeTagsQuery {
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

  const tagsMap = Array.from(
    res
      .reduce((arr, curr) => {
        curr.forEach((index) => {
            if arr.get(index)
        });
      }, new Map())
      .values()
  );

  console.log(tagsMap);
}

main().catch((error) => {
  console.log("ERROR");
  console.log(error);
});
