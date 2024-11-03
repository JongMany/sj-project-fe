import {auth} from '@/auth';
import Link from 'next/link';

export default async function Home() {
  const session = await auth();
  const name = session?.user?.name;
  const group = session?.user?.group;
  const externalLink = getExternalLink(group);


  return (
      <div className="bg-white px-2 py-4">
        <div className="flex flex-col mb-4">
          <span className='text-black text-[14px] mb-2'>
            <strong className="font-bold text-[16px]">{name}</strong>님, 안녕하세요!
          </span>
          <span className='text-black'>그룹: {group}</span>
        </div>
        <section>
          <Link
              href="/chat/create"
              className="text-black font-semibold text-[16px]"
          >
            에이전트 선택하러 가기
          </Link>
        </section>
        <section className='flex'>
          <span>오늘 사용한 에이전트에 대한 기록을 해주세요</span>
          <Link href={externalLink} target={'_blank'}>
            링크
          </Link>
        </section>
      </div>
  );
}

function getExternalLink(group: 'A'|'B'|'C'|'D') {
  switch (group) {
    case 'A': return 'https://naver.me/x0U9u41q';
    default: {
      alert('문제가 발생했습니다.')
      return '';
    }
  }
}