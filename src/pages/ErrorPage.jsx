import { useRouteError } from "react-router-dom";
import { Flex, Label } from "@lokalise/louis";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Flex>
      <Label>Šī lapa neeksistē</Label>
    </Flex>
  );
}
