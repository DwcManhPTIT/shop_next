import envConfig from '@/config';
import { cookies } from 'next/headers';
import { Profile } from './profile';
import accountApiRequest from '@/apiRequest/account';

export default async function MeProfile() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');
  console.log(sessionToken?.value);

  const result = await accountApiRequest.me(sessionToken?.value ?? '');

  return (
    <>
      <h1>Profile</h1>
      <div>Xin chao {result.payload.data.name} </div>;{/* <Profile /> */}
    </>
  );
}
