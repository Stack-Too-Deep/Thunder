import TaskCard from "./task-card";
import { VouchChoiceModal } from "./vouch/choiceModal";
import BorrowMainModal from "./borrow/borrowMainModal";

export default function TaskGroup() {
  const lendingProps = {
    title: "Lend Money",
    description: "Lend money to a borrower.",
    buttonComponent: <VouchChoiceModal />
  };

  const borrowingProps = {
    title: "Borrow Money",
    description: "Need money? Borrow from a lender here.",
    buttonComponent: <BorrowMainModal />
  };

  const vouchingProps = {
    title: "Vouch for someone",
    description: "Vouch for a borrower and earn a commission.",
    buttonComponent: <VouchChoiceModal />
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
