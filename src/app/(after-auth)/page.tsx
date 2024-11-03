import {auth} from '@/auth';
import Link from 'next/link';
import Image from "next/image";
import Mongle from "@/assets/mongle.png"

export default async function Home() {
  const session = await auth();
  const name = session?.user?.name;
  const group = session?.user?.group;
  const externalLink = getExternalLink(group!);

  return (
      <div className="bg-white px-2 py-4 min-h-[calc(100dvh-50px)] flex flex-col justify-between">
        <div>
          <div className="flex flex-col mb-4">
          <span className='text-black text-[14px] mb-2'>
            <strong className="font-bold text-[16px] ml-4 mt-2">{name}</strong>님, 안녕하세요!
          </span>
          </div>
          <section className='flex flex-col justify-center gap-y-10 ml-4'>
            <Link
                href="/chat/create"
                className="text-black font-semibold text-[16px]"
            >
              <div className='w-[50dvw] h-[40dvw] bg-gray-200 rounded-md flex flex-col items-center justify-center'>
                <Image src={Mongle} alt={'몽글이'} width={`150`} />
                <span>에이전트와 대화하기</span>
              </div>
            </Link>
            <div className='flex'>

              <Link href={externalLink} target={'_blank'}
                    className='w-[50dvw] px-4 py-4 text-black font-semibold  bg-gray-200 rounded-md text-center'>

                사용일지 작성하기
              </Link>
            </div>
          </section>
        </div>
        <footer className='px-2 py-1 flex flex-col gap-y-2 ml-2'>
          <div>
            <p className='font-semibold text-[15px]'>실험 안내</p>
            <ul className='ml-2'>
              <li>실험 기간: 11/6(수) ~ 11/12(화)</li>
              <li>수행 내역 : 매일 AI 에이전트와 대화 후 사용 일지 작성</li>
            </ul>
          </div>
          <div>
            <p className='font-semibold text-[15px]'>문의사항</p>
            <div className='flex flex-col ml-2'>
              <span className=''>Tel) 010-4722-1939</span>
              <span className=''>Email) kkwaksj1214@naver.com</span>
            </div>
          </div>
        </footer>
      </div>
  );
}

function getExternalLink(group: 'A' | 'B' | 'C' | 'D') {
  switch (group) {
    case 'A':
      return 'https://naver.me/x0U9u41q';
    case 'B':
      return 'https://naver.me/FK598DBf';
    case 'C':
      return 'https://naver.me/5XJVB2M7';
    case 'D':
      return 'https://naver.me/FIfMi5WS';
    default: {
      alert('문제가 발생했습니다.')
      return '';
    }
  }
}