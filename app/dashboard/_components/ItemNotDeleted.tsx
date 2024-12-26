import { AlertDialog, Button } from "@radix-ui/themes";

interface Props {
  open: boolean;
  setError: (error: boolean) => void
}

const ItemNotDeleted = ({ open, setError }: Props) => {
  return (
    <AlertDialog.Root open={open}>
      <AlertDialog.Content>
        <AlertDialog.Title>Error</AlertDialog.Title>
        <AlertDialog.Description>
          This product could not be deleted.
        </AlertDialog.Description>
        <Button
          color="gray"
          variant="soft"
          mt="2"
          onClick={() => setError(false)}
        >
          Ok
        </Button>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default ItemNotDeleted;
