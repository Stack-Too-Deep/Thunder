import TaskCard from "./task-card";

export default function TaskGroup() {
  const lendingProps = {
    title: "Lend Money",
    description: "Lend money to a borrower.",
    buttonText: "Lend 💸",
    buttonComponent: "",
  };

  const borrowingProps = {
    title: "Borrow Money",
    description: "Need money? Borrow from a lender here.",
    buttonText: "Borrow 💸",
    buttonComponent: "",
  };

  const vouchingProps = {
    title: "Vouch for someone",
    description: "Vouch for a borrower and earn a commission.",
    buttonText: "Vouch 👍",
    buttonComponent: "",
  };

  return (
    <>
      <div className="flex flex-row mt-8 space-x-6 p-6 border backdrop-blur-md" style={{
        borderRadius: "10px",
      }}>
        <TaskCard {...lendingProps} />
        <TaskCard {...borrowingProps}/>
        <TaskCard {...vouchingProps}/>
      </div>
    </>
  );
}
