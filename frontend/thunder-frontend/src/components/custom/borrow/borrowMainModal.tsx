import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

import VerifyProofModalSubpart from "./verifyProofModalSubpart"
import ViewExistingLoansSubpart from "./viewExistingLoans"

export default function BorrowMainModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-full">Borrow 💸</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <VerifyProofModalSubpart />
        <Separator />
        <ViewExistingLoansSubpart />
      </DialogContent>
    </Dialog>
  )
}
