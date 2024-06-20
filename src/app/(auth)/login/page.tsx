import LoginForm from './loginForm';

export default function PageLogin() {
  return (
    <>
      <div className="text-2xl text-center pb-10 font-medium">Đăng nhập</div>
      <div className="flex justify-center">
        <LoginForm />
      </div>
    </>
  );
}
