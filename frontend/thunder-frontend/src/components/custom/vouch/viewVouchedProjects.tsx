import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import VouchedProjectsTable from "./vouchedProjectsTable";

export default function ViewVouchedProjects() {
  return (
    <Drawer>
      <DrawerTrigger>
        <Button variant={"outline"}>View who you've vouched</Button>
      </DrawerTrigger>
      <DrawerContent>
        <VouchedProjectsTable />
      </DrawerContent>
    </Drawer>
  );
}
