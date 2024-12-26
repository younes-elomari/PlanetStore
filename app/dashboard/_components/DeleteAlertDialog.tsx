import Spinner from "@/app/_components/Spinner";
import { AlertDialog, Button, Flex, Text } from "@radix-ui/themes";
import { AiTwotoneDelete } from "react-icons/ai";

interface Props {
  isDeleting: boolean;
  handleDelete: () => void;
}

const DeleteAlertDialog = ({ isDeleting, handleDelete }: Props) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button size="1" color="red" variant="soft" disabled={isDeleting}>
          <AiTwotoneDelete size="15" className="cursor-pointer" />
          {isDeleting && <Spinner />}
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description>
          <Text size="3" weight="medium">
            Are you sure you want to do this action? This action cannot be
            undone.
          </Text>
        </AlertDialog.Description>
        <Flex mt="4" gap="3">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              <Text className="cursor-pointer">Cancel</Text>
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color="red" onClick={handleDelete}>
              <Text className="cursor-pointer">Delete</Text>
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteAlertDialog;
