import { useMeQuery } from '@generated/graphql';
import { atom } from 'jotai';

export function checkIsLoggedIn() {
  const { data } = useMeQuery()

  if (!data?.me) return false;
  return true;
}
export const authorizationAtom = atom(checkIsLoggedIn());
