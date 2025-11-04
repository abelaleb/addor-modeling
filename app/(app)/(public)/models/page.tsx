import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className=" max-w-screen-lg justify-center w-full m-auto gap-2 flex text-2xl font-bold italic pb-4">
      <Link href="/models/women" className="w-1/2">
        <div className="w-full relative">
          <Image
            className="w-full object-cover h-full "
            src="https://images.unsplash.com/photo-1592621385645-e41659e8aabe?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3w0MzI3MjJ8MHwxfHNlYXJjaHwzMHx8eW91bmctd29tYW4tbW9kZWxzfGVufDB8fHx8MTcyMTkwMDI1NXww\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=1080"
            alt="aw"
            width={1000}
            height={1000}
          />
          <div className="absolute inset-0 w-full h-full opacity-0 hover:opacity-100 bg-black bg-opacity-50 text-gray-50 flex justify-center items-center  transition-opacity duration-500">
            OVER 200 MODELS
          </div>
        </div>
      </Link>
      <Link href="/models/men" className="w-1/2">
        <div className="w-full h-full relative">
          <Image
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1495638488670-437e54b3bab4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MzI3MjJ8MHwxfHNlYXJjaHw0fHxiZWF1dGlmdWwtbWVuLW1vZGVsc3xlbnwwfHx8fDE3MjE4OTcyNDF8MA&ixlib=rb-4.0.3&q=80&w=1080"
            alt="j"
             width={1000}
            height={1000}
          />
          <div className="absolute opacity-0 hover:opacity-100 inset-0 w-full h-full bg-black bg-opacity-50 text-gray-50 flex justify-center items-center  transition-opacity duration-500">
            OVER 150 MODELS
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Page;
