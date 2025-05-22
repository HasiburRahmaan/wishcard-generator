'use client'

import { IRootState } from "@/store";
import { useSelector } from "react-redux";

export default function Home() {
  const loader = useSelector((state: IRootState) => state.loader)
  return (
    <div>
      <h1></h1>
    </div>
  );
}
