import { Vote } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";

export const useQueryVote = () => {
  const router = useRouter();

  const getVote = async () => {
    console.log("ここ動いている？");
    const { data } = await axios.get<Vote[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/vote`
    );
    console.log(data, "=========");
    return data;
  };

  return useQuery<Vote[], Error>({
    queryKey: ["votes"],
    queryFn: getVote,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403)
        router.push("/");
    },
  });
};
