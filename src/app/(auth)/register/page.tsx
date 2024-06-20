import RegisterForm from './registerForm';

// 1. Define your form.

export default function PageRegister() {
  return (
    <>
      <div className="text-2xl text-center pb-10 font-medium">Đăng Kí</div>
      <div className="flex justify-center">
        <RegisterForm />
      </div>
    </>
  );
}
