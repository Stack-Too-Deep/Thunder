import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Textarea } from "@/components/ui/textarea";
import { useAccount } from "@metamask/sdk-react-ui";
import { useState } from "react";
import { request, gql } from "graphql-request";
import { useStore } from "./store";

const Api_Url = `https://gateway-arbitrum.network.thegraph.com/api/7ca7636f3f5928a15f317ab35cd9ac8e/subgraphs/id/JCNWRypm7FYwV8fx5HhzZPSFaMxgkPuw4TnR3Gpi81zk`;
const protocolQuery = gql`
  query ProtocolQuery($address: String!) {
    account(id: $address) {
      id
      depositCount
      liquidateCount
      openPositionCount
      closedPositionCount
      repayCount
      borrowCount
      liquidationCount

      borrows {
        id
        amount
        amountUSD
        asset {
          name
          symbol
          decimals
        }
      }

      liquidations {
        id
        amount
        amountUSD
        asset {
          name
          symbol
          decimals
        }
      }

      repays {
        id
        amount
        amountUSD
        asset {
          name
          symbol
          decimals
        }
      }
    }
    tokens(first: 1) {
      id
      name
      symbol
      decimals
    }
    rewardTokens(first: 1) {
      id
      token {
        id
      }
      type
      _distributionEnd
    }
    borrows(first: 10) {
      id
      amount
      amountUSD
      asset {
        name
        symbol
        decimals
      }
    }
    repays(first: 10) {
      id
      amount
      amountUSD
    }
    withdraws(first: 10) {
      amountUSD
      position {
        liquidationCount
      }
    }
  }
`;

const dexQuery = gql`
  query DexQuery($address: String!) {
    account(id: $address) {
      positions {
        id
        cumulativeDepositUSD
        cumulativeRewardUSD
        cumulativeWithdrawUSD
        pool {
          id
          protocol {
            name
            activeLiquidityUSD
            totalLiquidityUSD
          }
          name
          symbol
        }
      }

      positionCount
    }
  }
`;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const executeQuery = async (address: string, type: "dex" | "protocol") => {
  for (let i = 0; i < 2; i++) {
    try {
      const url =
        "https://gateway-arbitrum.network.thegraph.com/api/7ca7636f3f5928a15f317ab35cd9ac8e/subgraphs/id/JCNWRypm7FYwV8fx5HhzZPSFaMxgkPuw4TnR3Gpi81zk";
      if (type === "dex") {
        const data = await request(url, dexQuery, { address });
        console.log(data);
        return data;
      } else {
        const data = await request(url, protocolQuery, { address });
        console.log(+data);
        return data;
      }
    } catch (e) {
      sleep(2000);
    }
  }
  return 0;
};

function calculateTotals(data) {
  // Aggregate totalBorrowed by summing up the amountUSD of each borrow transaction
  const totalBorrowed = data.borrows.reduce((sum, borrow) => {
    return sum + parseFloat(borrow.amountUSD);
  }, 0);

  // Aggregate totalRepaid by summing up the amountUSD of each repay transaction
  const totalRepaid = data.repays.reduce((sum, repay) => {
    return sum + parseFloat(repay.amountUSD);
  }, 0);

  console.log(totalBorrowed, totalRepaid);

  const openPositions = data.account ? data.account.openPositionCount : 0;
  const closedPositions = data.account ? data.account.closedPositionCount : 1;
  const liquidationCount = data.account
    ? data.withdraws.position.liquidationCount
    : 0;
  console.log(
    totalBorrowed,
    totalRepaid,
    openPositions,
    closedPositions,
    liquidationCount
  );

  return {
    totalBorrowed,
    totalRepaid,
    openPositions,
    closedPositions,
    liquidationCount,
  };
}

const scaleTo1000 = (number) => {
  if (number <= 0) {
    return 0;
  }

  const scaledNumber = Math.log(number);
  return Math.min(1000, scaledNumber * (1000 / Math.log(10000000)));
};

const parseProtocolData = (data) => {
  const {
    totalBorrowed,
    totalRepaid,
    openPositions,
    closedPositions,
    liquidationCount,
  } = calculateTotals(data);

  const weights = {
    delta: 0.3,
    gamma: 0.8,
    lambda: 1,
    vouch: 0.01,
  };

  const delta = (totalRepaid - totalBorrowed) / totalRepaid;
  const gamma = closedPositions / (openPositions + closedPositions);
  const lambda = liquidationCount ** 2;

  const score = Math.abs(
    weights.gamma * gamma - weights.delta * delta - weights.lambda * lambda
  );

  const scaledScore = scaleTo1000(score);

  console.log({ score, scaledScore });

  return scaledScore;
};

async function getReputation(address) {
  let total = 0;
  // for (const protocol in config.protocol) {
  //   const chains = config.protocol[protocol];
  //   for (const chain in chains) {
  //     const id = chains[chain];
  //     const data = await executeQuery(id, address, "protocol");
  //     const score = parseProtocolData(data);
  //     total += score;
  //   }
  // }
  try {
    const data = await executeQuery(address, "protocol");
    const score = parseProtocolData(data);
    total += score;
  } catch (e) {
    console.log(e);
  }
  return Math.floor(total);
}

export function CreditScoreCard() {
  const [credScore, setCredScore] = useState("");
  const [data, setData] = useState("");
  const store = useStore();

  const { address } = useAccount();

  // TODO: update to show real credit score and proof data
  const calcCredScore = async () => {
    // const credScore = await getReputation(address);
    store.creditScore = "250";
    setCredScore(store.creditScore);
    setData(
      '["0x0074259a75fcfe44eb2ac07b9f85ac583f68bd4f2aea269f54eec6fb8416caa1", "0x19c8265516d64780d356a37502662a425247a6a5076a94ecb13c04b6c32e8e28"],[["0x0729cdcb8cb3d16871f7f8d8a3d0bdb4a531c06ab2b8b5a3e3e658b129c7e35a", "0x0537c03a1529088939e3c37153d31e44d8322879f699a2e13457e27d9fb7bce5"],["0x12221c8ff42475ab6f448013a5ca125e9daf3bd33acfd067173d2aeeb0e1e052", "0x2f9d65c06c4cad293c0c5fdaff589b5e4deb32ada594983ce7a643bdcea39956"]],["0x0344c7a92b1dafd6d2abde11eaf05dd8f31b52572d662db3e03f2281ee1e862d", "0x0836a67e03d0c19e52682c2e4c41713b0b9cda107235bbd3a0e065b4673164a0"],["0x0000000000000000000000000000000000000000000000000000000000000960","0x0000000000000000000000000000000000000000000000000000000000002710","0x0000000000000000000000000000000000000000000000000000000000004e20","0x0000000000000000000000000000000000000000000000000000000000001388","0x0000000000000000000000000000000000000000000000000000000000001388","0x000000000000000000000000000000000000000000000000000000000000000a"]'
    );
  };

  return (
    <Card
      className="w-[400px] align-middle bg-transparent"
      style={{
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <CardContent className="pt-4">
        <Label>Credit Score</Label>
        <form>
          <div className="grid w-full items-center">
            <div className="flex flex-row space-x-1.5">
              <Input
                id="credScore"
                readOnly
                value={credScore}
                placeholder="Not calculated yet"
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      variant="outline"
                      type="button"
                      size="icon"
                      onClick={calcCredScore}
                    >
                      🖩
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Calculate Credit Score</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Textarea
              className="mt-4 resize-none"
              readOnly
              placeholder="zkp data"
              value={data}
            ></Textarea>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
