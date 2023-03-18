import { title } from "process";
import { LogoutIcon, PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { List, ThemeIcon, Loader } from "@mantine/core";
import { IconCircleDashed } from "@tabler/icons";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Layout } from "../components/Layout";
import { TaskForm } from "../components/TaskForm";
import { TaskList } from "../components/TaskList";
import { VoteForm } from "../components/VoteForm";
import { useQueryVote } from "../hooks/useQueryVote";

const Vote: NextPage = () => {
  const { data: votes, status } = useQueryVote();
  console.log(votes, "=========");
  return (
    <Layout title="Task Board">
      {/* <VoteForm /> */}
      <List
        my="lg"
        spacing="sm"
        size="sm"
        icon={
          <ThemeIcon color="cyan" size={24} radius="xl">
            <IconCircleDashed size={16} />
          </ThemeIcon>
        }
      >
        {votes &&
          votes.length !== 0 &&
          votes.map((vote) => (
            <List.Item key={vote.id}>
              <div className="float-left mr-10">
                <PencilAltIcon className="mx-1 h-5 w-5 cursor-pointer text-blue-500" />
              </div>
              <span>{vote.text}</span>
            </List.Item>
          ))}
      </List>
    </Layout>
  );
};

export default Vote;
