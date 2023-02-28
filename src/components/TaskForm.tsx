import { TextInput, Button, Center } from "@mantine/core";
import { IconDatabase } from "@tabler/icons";
import { FormEvent } from "react";
import { useMutateTask } from "../hooks/useMutateTask";
import useStore from "../stores";

export const TaskForm = () => {
  const { editedTask } = useStore();
  // pencilAltIconを押下するとupdate関数が発火して上記のeditedTask（state）に値が入って
  // inputのvaluが満たされるわけね
  // てことはフォームのためにzustand使っているのね
  const update = useStore((state) => state.updateEditedTask);
  const { createTaskMutation, updateTaskMutation } = useMutateTask();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // submitによるリロードを防ぐ
    if (editedTask.id === 0)
      createTaskMutation.mutate({
        title: editedTask.title,
        description: editedTask.description,
      });
    else {
      updateTaskMutation.mutate({
        id: editedTask.id,
        title: editedTask.title,
        description: editedTask.description,
      });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextInput
          mt="md"
          placeholder="title"
          value={editedTask.title || ""}
          onChange={(e) => update({ ...editedTask, title: e.target.value })}
        />
        <TextInput
          mt="md"
          placeholder="description"
          value={editedTask.description || ""}
          onChange={(e) =>
            update({ ...editedTask, description: e.target.value })
          }
        />
        <Center mt="lg">
          <Button
            disabled={editedTask.title === ""}
            leftIcon={<IconDatabase size={14} />}
            color="cyan"
            type="submit"
          >
            {editedTask.id === 0 ? "Create" : "Update"}
          </Button>
        </Center>
      </form>
    </>
  );
};
