import Link from 'next/link';

export default function Page() {
  return (
    <div className="bg-white px-6 py-4">
      <h2 className="font-semibold text-[19px] text-black pt-5 mb-14 ml-4">
        원하는
        <br />
        에이전트를
        <br />
        선택하세요
      </h2>
      <section className="flex flex-col gap-y-4">
        <Link
          href="/chat/funny"
          className="text-black font-semibold text-[16px] w-full text-center py-3 bg-gray-100 rounded-md"
        >
          재미맨
        </Link>
        <Link
          href="/chat/kind"
          className="text-black font-semibold text-[16px] w-full text-center py-3 bg-gray-100 rounded-md"
        >
          친절맨
        </Link>
        <Link
          href="/chat/feedback"
          className="text-black font-semibold text-[16px] w-full text-center py-3 bg-gray-100 rounded-md"
        >
          피드백맨
        </Link>
      </section>
    </div>
  );
}
