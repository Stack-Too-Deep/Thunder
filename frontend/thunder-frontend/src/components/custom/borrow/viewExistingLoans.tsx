import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

export default function ViewExistingLoansSubpart() {
  // TODO: The following is the test data, replace it with abi data
  const data = [
    {
      loanID: "0xefccacde8d300b56a9dd3e015908871dfb43e286",
      creditScore: "250",
      amount1: "100 ETH",
      amount2: "1000 DAI",
    },
    {
      loanID: "0xefccacde8d300b56a9dd3e015908871dfb43e286",
      creditScore: "220",
      amount1: "58 ETH",
      amount2: "69 DAI",
    }
  ];
  return (
    <>
      <Drawer>
        <DrawerTrigger>
          <Button className="w-full">View Existing loans</Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="relative overflow-x-auto p-8 shadow-md">
            <table className="w-full text-sm text-left rounded-lg rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Loan ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Credit Score
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Transaction
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((loan) => {
                  console.log(loan);
                  return (
                    <>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white line-clamp-2"
                        >
                          {loan.loanID}
                        </th>
                        <td className="px-6 py-4">{loan.creditScore}</td>
                        <td className="px-6 py-4">
                          {loan.amount1} 💱 {loan.amount2}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button variant={"outline"}>Repay</Button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
