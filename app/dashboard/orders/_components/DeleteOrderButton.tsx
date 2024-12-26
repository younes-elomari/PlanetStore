"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DeleteAlertDialog from "../../_components/DeleteAlertDialog";
import ItemNotDeleted from "../../_components/ItemNotDeleted";

const DeleteOrderButton = ({ orderId }: { orderId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const deleteOrder = async () => {
    try {
      setDeleting(true);
      await axios.delete("/api/orders/" + orderId);
      router.push("/dashboard/orders");
      router.refresh();
    } catch (error) {
      setDeleting(false);
      setError(true);
    }
  };

  return (
    <>
      <DeleteAlertDialog isDeleting={isDeleting} handleDelete={deleteOrder} />
      <ItemNotDeleted open={error} setError={setError} />
    </>
  );
};

export default DeleteOrderButton;
