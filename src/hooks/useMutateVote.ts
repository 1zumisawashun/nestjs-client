import { Vote } from "@prisma/client";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";

type VoteProps = {
  id: number;
  text: string;
};

export const useMutateVote = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const createVoteMutation = useMutation(
    async (vote: VoteProps) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/vote`,
        vote
      );
      return res.data;
    },
    {
      onSuccess: (res) => {
        const previousVotes = queryClient.getQueryData<Vote[]>(["votes"]);
        if (previousVotes) {
          // 既存のキャッシュに新しく取得した値を追加する
          queryClient.setQueryData(["votes"], [res, ...previousVotes]);
        }
      },
      onError: (err: any) => {
        if (err.response.status === 401 || err.response.status === 403) {
          router.push("/");
        }
      },
    }
  );

  const createUpvoteMutation = useMutation(
    async (vote: VoteProps) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/vote/${vote.id}`
      );
      return res.data;
    },
    {
      onSuccess: (res, variables) => {
        const previousVotes = queryClient.getQueryData<Vote[]>(["votes"]);
        if (previousVotes) {
          // 既存のキャッシュから取り除く
          queryClient.setQueryData(
            ["votes"],
            previousVotes.map((vote) => (vote.id === res.id ? res : vote))
          );
        }
      },
      onError: (err: any) => {
        if (err.response.status === 401 || err.response.status === 403) {
          router.push("/");
        }
      },
    }
  );

  return { createVoteMutation, createUpvoteMutation };
};
