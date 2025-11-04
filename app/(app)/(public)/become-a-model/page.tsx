"use client";
import React, { useState } from "react";
import FemaleModel from "@/components/forms/FemaleModel";
import MaleModel from "@/components/forms/MaleModel";
const Page = () => {
  const [gender, setGender] = useState<String>("female");

  return (
    <div className="max-w-screen-2xl m-auto px-2">
      <div className="flex justify-center items-center py-4">
        The quickest & easiest way is to send your images to us via this page.
        Make sure you complete all the sections and someone will be in touch
        with you if we feel that you have the right look for us.
      </div>
      <div className="flex max-w-64 m-auto text-center">
        <div
          className={`flex-1 cursor-pointer font-semibold py-1 ${
            gender === "female" ? "bg-foreground text-background" : " "
          }`}
          onClick={() => {
            setGender("female");
          }}
        >
          FEMALE
        </div>
        <div
          className={`flex-1 cursor-pointer font-semibold py-1 ${
            gender === "male" ? "bg-foreground text-background" : ""
          }`}
          onClick={() => {
            setGender("male");
          }}
        >
          MALE
        </div>
      </div>
      {gender == "female" ? <FemaleModel /> : <MaleModel />}
    </div>
  );
};

export default Page;
