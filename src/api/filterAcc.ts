import { gql, GraphQLClient } from "graphql-request";
import { ZEITGEIST_GQL_URL } from "../const";

const filterAccountsQuery = gql`
  query filterAccounts {
    historicalAssets(
      where: {
        event_contains: "Swap"
        accountId_isNull: false
        timestamp_gt: "2022-10-01T00:00:00Z"
        timestamp_lt: "2022-11-25T00:00:00Z"
      }
      orderBy: accountId_ASC
    ) {
      accountId
      ztgTraded
    }
  }
`;

export const getFilterAccounts = async (client: GraphQLClient) => {
  const response = await client.request<{
    historicalAssets: {
      accountId: string[];
      ztgTraded: Number[];
    }[];
  }>(filterAccountsQuery);

  return response.historicalAssets;
};

async function main() {
  /**
   * Fetching asset indexes works with both rpc and indexer mode.
   */
  const endPoint = new GraphQLClient(ZEITGEIST_GQL_URL);
  const res = await getFilterAccounts(endPoint);

  console.log(res);
}

main().catch((error) => {
  console.log("ERROR");
  console.log(error);
});
