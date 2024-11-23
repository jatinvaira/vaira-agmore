import exp from "constants";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { User } from "@clerk/nextjs/server";

import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/global/mode-toggle";

type Props = {
  user?: null | User;
};

const Navigation = (props: Props) => {
  return (
    <header>
      <div className="fixed top-0 right-0 left-0 p-4 flex items-center justify-between z-50 ">
        <aside className="flex items-center gap-2">
          <Image
            src={"./assets/agmore-logo.svg"}
            width={40}
            height={40}
            alt="logo"
          />
          <span className="text-xl font-bold select-none">Agmore.</span>
          {/* fixing pub */}
        </aside>
        <nav className="hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
          <ul className="flex items-center justify-center gap-8">
            <Link href={"#"}>Pricing</Link>
            <Link href={"#"}>About</Link>
            <Link href={"#"}>Documentation</Link>
            <Link href={"#"}>Features</Link>
          </ul>
        </nav>
        <aside className="flex gap-2 items-center">
          <Link
            href={"/agency"}
            className="bg-primary text-white p-2 px-4 rounded-md hover:bg-primary/80"
          >
            Dashboard
          </Link>
          <UserButton />
          <ModeToggle></ModeToggle>
        </aside>
      </div>
    </header>
  );
};

export default Navigation;
