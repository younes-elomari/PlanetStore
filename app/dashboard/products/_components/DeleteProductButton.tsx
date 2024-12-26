"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DeleteAlertDialog from "../../_components/DeleteAlertDialog";
import ItemNotDeleted from "../../_components/ItemNotDeleted";

const DeleteProductButton = ({ productId }: { productId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const deleteProduct = async () => {
    try {
      setDeleting(true);
      await axios.delete("/api/products/" + productId);
      router.push("/dashboard/products");
      router.refresh();
    } catch (error) {
      setDeleting(false);
      setError(true);
    }
  };

  return (
    <>
      <DeleteAlertDialog isDeleting={isDeleting} handleDelete={deleteProduct} />
      <ItemNotDeleted open={error} setError={setError} />
    </>
  );
};

export default DeleteProductButton;
