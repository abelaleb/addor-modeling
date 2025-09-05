import { useGetModelsQuery } from "@/hooks/api/models";
import Image from "next/image";
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
                <Image
                  src={model.urls.regular}
                  alt="Image"
                  className=" object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-500 ease-in-out"
                  width={100}
                  height={100}
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
