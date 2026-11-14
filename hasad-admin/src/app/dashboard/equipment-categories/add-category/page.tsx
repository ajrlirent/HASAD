"use client";
import dynamic from "next/dynamic";

const AddCategory = dynamic(
  () => import("@/components/machine-categories/add-category"),
  {
    ssr: false,
  }
);

export default function Page() {
  return <AddCategory machineType={"equipment"} />;
}
