import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

import BorrowProposalModal from "./borrowProposalModal";

export default function VerifyProofModalSubpart() {
  const [proof, setProof] = useState("");
  const [publicInput, setPublicInput] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const verifyProof = () => {
    // TODO: Update this function to verify the proof
    

    console.log(proof);
    console.log(publicInput);
    setIsVerified(true);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="font-extrabold">
          Verify your proof first
        </DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="proof" className="text-right">
            Proof
          </Label>
          <Input
            id="proof"
            onChange={(e) => {
              setProof(e.target.value);
            }}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="publicInput" className="text-right">
            Public Input
          </Label>
          <Textarea
            className="col-span-3"
            onChange={(e) => {
              setPublicInput(e.target.value);
            }}
            name="publicInput"
          />
        </div>
      </div>
      <DialogFooter>
        <Button
          type="button"
          onClick={verifyProof}
          className="w-full"
          variant={"secondary"}
        >
          Verify Proof
        </Button>
      </DialogFooter>
      <BorrowProposalModal open={isVerified} setOpen={setIsVerified} />
    </>
  );
}
