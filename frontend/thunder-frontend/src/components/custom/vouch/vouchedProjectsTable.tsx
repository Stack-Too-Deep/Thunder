import ListItem from "./listItem";

export default function VouchedProjectsTable() {
  const contractAddress = "0xee82ae5f54a0290c01c51de2697c01f02112a981";

  return (
    <div className="min-w-[30rem] mx-auto">
      <h1 className="text-xl pt-8 font-bold">The address you vouched for:</h1>
      <ul className="pb-10 pt-4 mx-auto divide-gray-200 dark:divide-gray-700">
        <ListItem address="0xefccacde8d300b56a9dd3e015908871dfb43e286" />
      </ul>
    </div>
  );
}
