import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


interface TaskCardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonComponent: string;
}

export default function TaskCard(props: TaskCardProps) {
  // TODO: individual task card with props including -
  // title, description, button text, button opening component
  return (
    <Card className="w-[400px] text-center p-2">
      <CardHeader>
        <CardTitle className="font-extrabold">{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-center">
        <Button className="w-full" variant={"secondary"}>{props.buttonText}</Button>
      </CardFooter>
    </Card>
  );
}
