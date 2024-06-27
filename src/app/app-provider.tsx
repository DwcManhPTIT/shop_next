'use client';

import { clientSessionToken } from '@/lib/http';
import { AccountResType } from '@/schemaValidations/account.schema';
import { createContext, useContext, useState } from 'react';

type User = AccountResType['data'] | null;

const Appcontext = createContext<{ user: User; setUser: (user: User) => void }>(
  { user: null, setUser: () => {} },
);
export const useAppContext = () => {
  const context = useContext(Appcontext);
  return context;
};
export default function AppProvider({
  children,
  initialSessionToken = '',
  user: userProps,
}: {
  children: React.ReactNode;
  initialSessionToken?: string;
  user: User;
}) {
  const [user, setUser] = useState<User>(userProps);
  useState(() => {
    if (typeof window !== 'undefined') {
      clientSessionToken.value = initialSessionToken;
    }
  });
  return (
    <Appcontext.Provider value={{ user, setUser }}>
      {children}
    </Appcontext.Provider>
  );
}
