"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DeleteAlertDialog from "../../_components/DeleteAlertDialog";
import ItemNotDeleted from "../../_components/ItemNotDeleted";

const DeleteMessageButton = ({ messageId }: { messageId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const deleteMessage = async () => {
    try {
      setDeleting(true);
      await axios.delete("/api/messages/" + messageId);
      router.push("/dashboard/messages");
      router.refresh();
    } catch (error) {
      setDeleting(false);
      setError(true);
    }
  };

  return (
    <>
      <DeleteAlertDialog isDeleting={isDeleting} handleDelete={deleteMessage} />
      <ItemNotDeleted open={error} setError={setError} />
    </>
  );
};

export default DeleteMessageButton;
