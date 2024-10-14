'use client';
import { useForm } from '@/hooks/common/useForm';
import { joinFormSchema } from '@/models/auth/join.schema';
import { showToast } from '@/utils/show-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function JoinForm() {
  const { form: joinForm, onChange: onChangeHandler } = useForm({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    phoneNumber: '',
    group: 'A', // 'A' | 'B' | 'C' | 'D'
  });
  const router = useRouter();

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    const validationResult = joinFormSchema.safeParse(joinForm);
    if (!validationResult.success) {
      const errorMessages = validationResult.error.format();
      console.log(errorMessages); // Validation errors will be logged here
      showToast('error', <>로그인 오류</>);
      return;
    }

    // Register Fetch

    fetch('http://localhost:8080/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(joinForm),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);

        if (res.success) {
          alert('회원가입 성공');
          router.replace('/login');
        } else {
          alert(res.message);
        }
      });
  };

  return (
    <form
      className="flex flex-col gap-y-5 text-black"
      onSubmit={onSubmitHandler}
    >
      <input
        type="email"
        placeholder="이메일"
        name="email"
        id="email"
        className="bg-white py-1 border-b-[1px]"
        value={joinForm.email}
        onChange={onChangeHandler}
      />
      <input
        type="password"
        placeholder="비밀번호"
        id="password"
        name="password"
        className="bg-white py-1 border-b-[1px]"
        onChange={onChangeHandler}
        value={joinForm.password}
      />
      <input
        type="password"
        placeholder="비밀번호 확인"
        id="passwordConfirm"
        name="passwordConfirm"
        className="bg-white py-1 border-b-[1px]"
        onChange={onChangeHandler}
        value={joinForm.passwordConfirm}
      />
      <input
        type="text"
        placeholder="이름"
        id="name"
        name="name"
        className="bg-white py-1 border-b-[1px]"
        onChange={onChangeHandler}
        value={joinForm.name}
      />
      <input
        type="tel"
        placeholder="전화번호(- 제외)"
        id="phoneNumber"
        name="phoneNumber"
        className="bg-white py-1 border-b-[1px]"
        onChange={onChangeHandler}
        value={joinForm.phoneNumber}
      />
      <div>
        <div className="w-[100px] inline-block text-black font-semibold">
          그룹
        </div>
        <span className="text-[10px] block text-gray-400 mb-2">
          진행자가 지정한 그룹에 맞게 선택해주세요. 그룹은 변경이 불가능합니다.
        </span>
        <div className="flex gap-3 justify-between">
          <div className="flex gap-x-2">
            <input
              type="radio"
              id="A"
              name="group"
              value="A"
              onChange={onChangeHandler}
              checked={joinForm.group === 'A'}
            />
            <label htmlFor="A">A</label>
          </div>
          <div className="flex gap-x-2">
            <input
              type="radio"
              id="B"
              name="group"
              value="B"
              onChange={onChangeHandler}
              checked={joinForm.group === 'B'}
            />
            <label htmlFor="B">B</label>
          </div>
          <div className="flex gap-x-2">
            <input
              type="radio"
              id="C"
              name="group"
              value="C"
              onChange={onChangeHandler}
              checked={joinForm.group === 'C'}
            />

            <label htmlFor="C">C</label>
          </div>
          <div className="flex gap-x-2">
            <input
              type="radio"
              id="D"
              name="group"
              value="D"
              onChange={onChangeHandler}
              checked={joinForm.group === 'D'}
            />
            <label htmlFor="D">D</label>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded-md w-full"
        >
          회원가입
        </button>
      </div>
    </form>
  );
}
