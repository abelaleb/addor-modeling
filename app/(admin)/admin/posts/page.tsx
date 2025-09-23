import React from "react";
import PostsTable from "../../posts/PostsTable";
import BackButton from "@/components/BackButton";
import PostsPagination from "./PostsPagination";
const page = () => {
  return (
    <div>
      <BackButton text="Go Back" link="/" />
      <PostsTable />
      <PostsPagination />
    </div>
  );
};

export default page;
