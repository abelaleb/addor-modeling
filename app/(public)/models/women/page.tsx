"use client";
import ModelsLayout from "@/components/layout/models-layout";

interface PageProps {
  // Define your component props here
}

const Page: React.FC<PageProps> = () => {
  return (
    <ModelsLayout url="https://api.unsplash.com/search/photos?client_id=N9wwdE7UFHBAY7Kn26XA5_NzsOIC1l3_rHAIbo-fe4s&page=1&query=young-woman-models&per_page=30" />
  );
};

export default Page;
