import { gql, GraphQLClient } from "graphql-request";
import { ZEITGEIST_GQL_URL } from "../const";

const filterAccountsQuery = gql`
  query filterAccounts($startTime: DateTime, $endTime: DateTime) {
    historicalAssets(
      where: {
        event_contains: "Swap"
        accountId_isNull: false
        timestamp_gt: $startTime
        timestamp_lt: $endTime
      }
      orderBy: accountId_ASC
    ) {
      accountId
      ztgTraded
    }
  }
`;

const setAmount = 10;
const startTime = "2022-10-01T00:00:00Z";
const endTime = "2022-11-25T00:00:00Z";

export const getFilterAccounts = async (
  client: GraphQLClient,
  startTime: String,
  endTime: String
) => {
  const response = await client.request<{
    historicalAssets: {
      accountId: string;
      ztgTraded: Number;
    }[];
  }>(filterAccountsQuery, {
    startTime: startTime,
    endTime: endTime,
  });

  return response.historicalAssets;
};

async function main() {
  /**
   * Fetching asset indexes works with both rpc and indexer mode.
   */
  const endPoint = new GraphQLClient(ZEITGEIST_GQL_URL);
  const res = await getFilterAccounts(endPoint, startTime, endTime);

  let accs = new Array<String>();
  let tempAccZTGPair = new Map();
  res.forEach((hisAssets) => {
    if (
      tempAccZTGPair.has(hisAssets.accountId) &&
      tempAccZTGPair.get(hisAssets.accountId) > setAmount * 10 ** 10
    ) {
      if (!accs.includes(hisAssets.accountId)) {
        accs.push(hisAssets.accountId);
      }
      return;
    }
    if (!tempAccZTGPair.has(hisAssets.accountId)) {
      tempAccZTGPair.set(hisAssets.accountId, hisAssets.ztgTraded);
    } else {
      tempAccZTGPair.set(
        hisAssets.accountId,
        tempAccZTGPair.get(hisAssets.accountId) + hisAssets.ztgTraded
      );
    }
  });

  console.log(accs);
}

main().catch((error) => {
  console.log("ERROR");
  console.log(error);
});
