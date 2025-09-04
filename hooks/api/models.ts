import { getModels } from "@/api/models";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetModelsQuery = (url: string) =>
  useQuery({
    queryKey: ["models", url], // Fix: Pass the query key as an array
    queryFn: () => getModels(url),
  });
