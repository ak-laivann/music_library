import axios, { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../config";

export const useCollections = () => {
  const delay = () => new Promise((resolve) => setTimeout(resolve, 5000));
  return useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      await delay();
      const { data, status } = await axios.get(`${BASE_URL}/api/collections`);
      return { response: data, status };
    },
  });
};

export const useCollectionDetails = (collectionId: string) => {
  return useQuery({
    queryKey: ["collections", collectionId],
    queryFn: async () => {
      if (!collectionId) {
        return new AxiosError("Missing ID", "400");
      }
      const { data, status } = await axios.get(
        `${BASE_URL}/api/collections/${collectionId}`
      );
      return { response: data, status };
    },
    enabled: !!collectionId,
  });
};
