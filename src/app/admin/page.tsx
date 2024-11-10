import React from 'react';
import Link from "next/link";
import {encodeByAES256} from "@/utils/encode";

async function Page() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/v1/user`, {
    next: {
      revalidate: 300,
    }
  });
  const users = await response.json();


  return (
      <div className="flex flex-col gap-y-2">
        {users.map((user, idx) => {
          const phoneNumber = user.phoneNumber;
          const id = phoneNumber.slice(5, 9) + idx;
          const encodedPhoneNumber = encodeByAES256(user.phoneNumber);
          const encodedId = encodeByAES256(user.id);
          return <div key={user.id}>
            <Link href={`/admin/user?id1=${encodedId}&id2=${encodedPhoneNumber}`}>
              {id}
            </Link>
          </div>
        })}
      </div>
  );
}

export default Page;