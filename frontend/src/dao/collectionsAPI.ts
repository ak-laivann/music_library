import axios, { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../config";

export const useCollections = (search: string, type: string[]) => {
  const delay = () => new Promise((resolve) => setTimeout(resolve, 1500)); // added only to simulate the async environment
  return useQuery({
    queryKey: ["collections", search, type],
    queryFn: async () => {
      await delay();

      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (type.length > 0) params.append("type", type.join(","));
      const { data, status } = await axios.get(
        `${BASE_URL}/api/collections?${params}`
      );
      return { response: data, status };
    },
  });
};

export const useCollectionDetails = (collectionId: string) => {
  const delay = () => new Promise((resolve) => setTimeout(resolve, 1500)); // added only to simulate the async environment
  return useQuery({
    queryKey: ["collections", collectionId],
    queryFn: async () => {
      await delay();
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
