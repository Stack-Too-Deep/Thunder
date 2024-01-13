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

import { useState } from "react";

export function CreditScoreCard() {
  const [credScore, setCredScore] = useState("");
  const [data, setData] = useState("");

  // TODO: update to show real credit score and proof data
  const calcCredScore = () => {
    setCredScore("800");
    setData("zkp data something");
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
              <Input id="credScore" value={credScore} placeholder="Not calculated yet" />
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
            <Textarea className="mt-4 resize-none" placeholder="zkp data" value={data}></Textarea>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
