import React from 'react';

type Props = {
  searchParams: {
    id: string;
  }
}
function Page({searchParams: {id}}:Props) {
  return (
      <div>{id}</div>
  );
}

export default Page;