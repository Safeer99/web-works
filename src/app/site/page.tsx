import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <UserButton />
      <p>landing page</p>
      <Link href={"/agency"}>Agency</Link>
    </div>
  );
}
