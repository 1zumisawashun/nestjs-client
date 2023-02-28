import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { List } from "@mantine/core";
import { Task } from "@prisma/client";
import { FC } from "react";
import { useMutateTask } from "../hooks/useMutateTask";
import useStore from "../stores";

export const TaskItem: FC<Omit<Task, "createdAt" | "updatedAt" | "userId">> = ({
  id,
  title,
  description,
}) => {
  const update = useStore((state) => state.updateEditedTask);
  // これで更新関数を呼んでいるのか、でupdate関数を使うと
  // storesから関数をローカルで使えるようにしているとのこと
  const { deleteTaskMutation } = useMutateTask();
  return (
    <List.Item>
      <div className="float-left mr-10">
        <PencilAltIcon
          className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
          onClick={() => {
            update({
              id,
              title,
              description,
            });
          }}
        />
        <TrashIcon
          className="h-5 w-5 cursor-pointer text-blue-500"
          onClick={() => {
            deleteTaskMutation.mutate(id);
          }}
        />
      </div>
      <span>{title}</span>
    </List.Item>
  );
};
