import useAsync from '../useAsync';

import * as authApi from '../../services/authApi';

export default function useSignInGH() {
  const {
    loading: LoadingSignInGH,
    error: signInGHError,
    act: signInGH
  } = useAsync(authApi.signInGitHub, false);

  return {
    LoadingSignInGH,
    signInGHError,
    signInGH
  };
}