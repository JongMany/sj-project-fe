import { IoIosArrowBack } from 'react-icons/io';
import JoinForm from '@/components/auth/join/join-form';
import Link from 'next/link';

export default function JoinPage() {
  return (
    <div className="flex justify-center">
      <section className="w-[280px] max-w-[400px] px-6 py-20">
        <div className="flex gap-x-3 items-center mb-5">
          <Link href="/login" replace>
            <span className="text-black">
              <IoIosArrowBack />
            </span>
          </Link>
          <h1 className="font-bold text-[18px]  text-black">회원가입</h1>
        </div>
        <JoinForm />
      </section>
    </div>
  );
}
