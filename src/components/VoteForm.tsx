import { TextInput, Button, Center } from "@mantine/core";
import { IconDatabase } from "@tabler/icons";
import { useState, BaseSyntheticEvent } from "react";
import { useMutateVote } from "../hooks/useMutateVote";

export const VoteForm = () => {
  const [text, setText] = useState("");

  const { createVoteMutation } = useMutateVote();

  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const value = e.target.value;
    createVoteMutation.mutate(value);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextInput
          mt="md"
          placeholder="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Center mt="lg">
          <Button
            disabled={false}
            leftIcon={<IconDatabase size={14} />}
            color="cyan"
            type="submit"
          >
            Create
          </Button>
        </Center>
      </form>
    </>
  );
};
