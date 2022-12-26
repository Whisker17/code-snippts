import { gql, GraphQLClient } from "graphql-request";

const totalTagsQuery = gql`
  query totalTagsQuery {
    markets(where: { status_eq: "Active" }) {
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
  const endPoint = new GraphQLClient("https://processor.zeitgeist.pm/graphql");
  const res = await getTotalTagsCount(endPoint);

  console.log(res);

  let i = 0;
  var tagsMaps = res.reduce((arr, curr) => {
    if (curr.tags === null || curr.tags.length === 0) {
      i++;
    } else {
      curr.tags.forEach((index) => {
        if (!arr.has(index)) {
          arr.set(index, 1);
        } else {
          arr.set(index, arr.get(index) + 1);
        }
      });
    }

    return arr;
  }, new Map());
  tagsMaps.set("Others", i);
  console.log(tagsMaps);
}

main().catch((error) => {
  console.log("ERROR");
  console.log(error);
});
