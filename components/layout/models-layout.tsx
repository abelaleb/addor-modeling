import { useGetModelsQuery } from "@/hooks/api/models";
import React from "react";

const ModelsLayout = ({ url }: { url: string }) => {
  const { data, isLoading, isError } = useGetModelsQuery(url);
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-2">
        {data &&
          data.results.map((model: any, index: number) => (
            <div className="flex flex-col cursor-pointer" key={index}>
              <div className=" mb-auto w-full h-full">
                <img
                  src={model.urls.regular}
                  alt="Image"
                  className=" object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-500 ease-in-out"
                />
              </div>
              <div className="text-center py-1 "> Abraham Belay</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ModelsLayout;
