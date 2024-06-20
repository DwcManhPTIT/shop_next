import Image from 'next/image';
import MeProfile from './me/page';

export default function Home() {
  return (
    <main>
      <h1 className="text-center text-4xl ">xin chao moi nguoi</h1>
      <div className="w-60 h-32">
        {/* <MeProfile /> */}
        {/* <Image
          width={100}
          height={100}
          alt="anhr ddep"
          src="/images/suf.png"
        ></Image> */}
      </div>
    </main>
  );
}
