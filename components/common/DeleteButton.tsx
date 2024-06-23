"use client";

import { deleteUserLive } from "@/utils/actions/deleteUserLive";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton } from "@mui/material";

type DeleteButtonProps = {
  userId: string;
  liveId: string;
};

export function DeleteButton({ userId, liveId }: DeleteButtonProps) {
  const handleDelete = async () => {
    const result = await deleteUserLive(userId, liveId);
    if (result.success) {
      // 成功メッセージを表示するなどの処理
      console.log("Deleted!");
    } else {
      // エラーメッセージを表示するなどの処理
      console.error(result.error);
    }
  };

  return (
    <IconButton
      className="w-1/9 rounded h-1/3 bg-secondary-main rounded-lg flex justify-start align-center p-2 border shadow-inner"
      onClick={handleDelete}
    >
      <ClearIcon className="text-red-500" />
    </IconButton>
  );
}
