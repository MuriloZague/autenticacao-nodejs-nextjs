"use client";

import api from "@/src/services/api";
import { useRouter } from "next/navigation";

interface Props {
  userId: string;
}

export default function DeleteButton({ userId }: Props) {
  const router = useRouter();
  async function handleDelete() {
    await api.delete(`/usuarios/${userId}`);
    router.refresh();
  }

  return (
    <button onClick={handleDelete} className="cursor-pointer text-red-500">
      Deletar
    </button>
  );
}
