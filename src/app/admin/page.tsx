import React from 'react';
import Link from "next/link";

async function Page() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/v1/user`, {
    next: {
      revalidate: 20
    }
  });
  const users = await response.json();

  return (
      <div>
        {users.map((user) => <div key={user.id}>
          <Link href={`/admin/user?id=${user.id}`}>
            {user.id}
          </Link></div>)}
      </div>
  );
}

export default Page;