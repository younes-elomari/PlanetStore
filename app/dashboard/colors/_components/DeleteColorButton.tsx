"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DeleteAlertDialog from "../../_components/DeleteAlertDialog";
import ItemNotDeleted from "../../_components/ItemNotDeleted";

const DeleteColorButton = ({ colorId }: { colorId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const deleteColor = async () => {
    try {
      setDeleting(true);
      await axios.delete("/api/colors/" + colorId);
      router.push("/dashboard/colors");
      router.refresh();
    } catch (error) {
      setDeleting(false);
      setError(true);
    }
  };

  return (
    <>
      <DeleteAlertDialog isDeleting={isDeleting} handleDelete={deleteColor} />
      <ItemNotDeleted open={error} setError={setError} />
    </>
  );
};

export default DeleteColorButton;