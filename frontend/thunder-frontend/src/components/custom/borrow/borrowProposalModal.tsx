import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import * as React from "react";

import { useState } from "react";
import { useStore } from "../store";

interface BorrowProposalModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BorrowProposalModal(props: BorrowProposalModalProps) {
  const store = useStore(); // store.creditScore mein credit score hai

  const [borrowToken, setBorrowToken] = useState("");
  const [borrowAmount, setBorrowAmount] = useState("");

  const [exchangeToken, setExchangeToken] = useState("");
  const [exchangeAmount, setExchangeAmount] = useState("");


  if(borrowToken === "sepolia" && exchangeToken === "mainnet") {
    setExchangeAmount(((1-(parseInt(store.creditScore)/1000))*parseInt(borrowAmount)).toString());
  }
//   var collateral = 
  // TODO: Write the function to calculate the collateral
  const calculateCollateral = () => {
    console.log(borrowToken);
    console.log(exchangeToken);
  };

  // TODO: Write the function to submit the proposal
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submit");
  };

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Borrow details</DialogTitle>
        </DialogHeader>
        <form onSubmit={calculateCollateral}>
          <div className="grid gap-4">
            <div className="items-center gap-4">
              <Label htmlFor="creditScore" className="text-right">
                Credit Score
              </Label>
              <Input
                id="creditScore"
                value={store.creditScore}
                placeholder="Your Credit Score generated will be shown here."
                readOnly
                required
              />
            </div>
            <Separator />
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="col-span-2">
                <Select
                  onValueChange={(value) => {
                    setBorrowToken(value);
                  }}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Token to borrow" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select the token</SelectLabel>
                      <SelectItem value="sepolia">Sepolia</SelectItem>
                      <SelectItem value="mainnet">Mainnet</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Input
                  id="borrowToken"
                  className="mt-2"
                  placeholder="0.00"
                  onChange={(e) => {
                    setBorrowAmount(e.target.value);
                  }}
                />
              </div>
              <div className="col-span-2">
                <Select
                  required
                  onValueChange={(value) => {
                    setExchangeToken(value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Exchange Token" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select the token</SelectLabel>
                      <SelectItem value="sepolia">Sepolia</SelectItem>
                      <SelectItem value="mainnet">Mainnet</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <div className="flex flex-row mt-2 space-x-1">
                  <Input
                    id="exchangeToken"
                    value={exchangeAmount}
                    placeholder="To be calculated"
                    readOnly
                  />
                  <Button
                    variant="outline"
                    type="button"
                    size="icon"
                    onClick={calculateCollateral}
                  >
                    🖩
                  </Button>
                </div>
              </div>
            </div>

            <Separator />
          </div>
          <DialogFooter>
            <Button type="submit" className="mt-4">
              Submit Proposal
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
