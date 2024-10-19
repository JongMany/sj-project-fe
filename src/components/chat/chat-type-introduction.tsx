import {userType} from "@/constants/user/user-type";
import Link from "next/link";
import React, {PropsWithChildren} from "react";
import {auth} from "@/auth";
import {FaBrain} from "react-icons/fa6";

type Props = {
  title: string;
  introduction: React.ReactNode;
}
export async function ChatTypeIntroduction({title, introduction}: Props) {
  const session = await auth();
  const userGroup = session?.user.group as "A" | "B" | "C" | "D";
  return (
      <section className="bg-gray-100 px-5 py-4 text-black text-[16px] rounded-md">
        <div className="flex justify-between">
          <h4 className="mb-5 font-semibold">{title}</h4>
          {
              userType[userGroup].removeMemory && (
                  <Link href="/chat/setting">
                    <FaBrain/>
                  </Link>
              )
          }
        </div>
        {introduction}
      </section>
  )
}