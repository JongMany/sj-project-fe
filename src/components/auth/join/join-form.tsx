'use client';
import { useForm } from '@/hooks/common/useForm';
import Link from 'next/link';

export default function JoinForm() {
  const { form: joinForm, onChange: onChangeHandler } = useForm({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    phoneNumber: '',
    group: 'A', // 'A' | 'B' | 'C' | 'D'
  });

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Validation Check!
    fetch('http://localhost:8080/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(joinForm),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          alert('회원가입 성공');
        } else {
          alert(res.message);
        }
      });
  };

  return (
    <form
      className="flex flex-col max-w-[360px] gap-3 px-8 py-4"
      onSubmit={onSubmitHandler}
    >
      <div>
        <label className="w-[100px] inline-block" htmlFor="email">
          이메일
        </label>
        <input type="email" placeholder="이메일" name="email" id="email" />
      </div>
      <div>
        <label className="w-[100px] inline-block" htmlFor="password">
          비밀번호
        </label>
        <input
          type="password"
          placeholder="비밀번호"
          id="password"
          name="password"
          onChange={onChangeHandler}
          value={joinForm.password}
        />
      </div>
      <div>
        <label className="w-[100px] inline-block" htmlFor="passwordConfirm">
          비밀번호 확인
        </label>
        <input
          type="password"
          placeholder="비밀번호 확인"
          id="passwordConfirm"
          name="passwordConfirm"
          onChange={onChangeHandler}
          value={joinForm.passwordConfirm}
        />
      </div>
      <div>
        <label className="w-[100px] inline-block" htmlFor="name">
          이름
        </label>
        <input
          type="text"
          placeholder="이름"
          id="name"
          name="name"
          onChange={onChangeHandler}
          value={joinForm.name}
        />
      </div>
      <div>
        <label className="w-[100px] inline-block" htmlFor="phoneNumber">
          전화번호
        </label>
        <input
          type="tel"
          placeholder="전화번호(- 제외)"
          id="phoneNumber"
          name="phoneNumber"
          onChange={onChangeHandler}
          value={joinForm.phoneNumber}
        />
      </div>
      <div>
        <div className="w-[100px] inline-block">그룹</div>
        <div className="flex gap-3">
          <div>
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
          <div>
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
          <div>
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
          <div>
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
      <div className="flex justify-center gap-x-8">
        <button type="submit">회원가입</button>
        <Link href="/login" replace>
          로그인으로
        </Link>
      </div>
    </form>
  );
}
