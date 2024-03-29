import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { Title, LineButton } from '@ui';
import { loginUser } from '@shared/stores/auth';
import { LogoSmall, Google } from '@assets/images';

import SigninForm, { SigninFormProps } from '../components/SigninForm';
import { requestSignin } from '../api/members';

export const FormField = styled.article`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  width: 448px;
  padding: 45px 40px;
  border-radius: 6px;
  margin-bottom: 20px;
`;

export const Logo = styled(LogoSmall)`
  text-align: center;
  margin-bottom: 20px;
  width: 100%;
`;

export const TitleWrap = styled(Title)`
  font-family: 'Poppins';
  text-align: center;
  width: 100%;
  line-height: 30px;
  margin-bottom: 32px;
`;

export const GoggleButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  gap: 4px;
  font-weight: 500;
  font-size: 16px;
  border-radius: 6px;
  width: 100%;
  height: 56px;
`;

export const SignupText = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 448px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray3};
`;

export const SignupButton = styled(LineButton)`
  width: 97px;
`;

export interface SigninContainerProps {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function SigninContainer(_: SigninContainerProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoToSignup = useCallback(() => {
    navigate('/auth/signup');
  }, [navigate]);

  const handleGoToFindPassword = useCallback(() => {
    navigate('/auth/password');
  }, [navigate]);

  const handleGoToGoogleSignin = useCallback(() => {
    // TODO: 임시 로그인 -- API 완료 후 제거 예정
    dispatch(loginUser());
    navigate('/studio');
    console.log('구글 로그인 구현 예정.');
  }, [dispatch, navigate]);

  const handleSignin = useCallback<SigninFormProps['onSubmit']>(
    async ({ email, password }) => {
      try {
        await requestSignin({ email: email, password: password });
        // todo check error
      } catch (e: any) {
        if (!e.success) {
          if (e.code === 201) {
            return {
              type: 'email',
              message:
                '가입된 이메일이 아닙니다.\n 아직 가입을 안하셨다면 회원가입 후 로그인해주세요.',
            };
          }

          if (e.code === 202) {
            return {
              type: 'password',
              message:
                '비밀번호가 틀렸습니다.\n 비밀번호를 잊으셨다면 비밀번호 찾기를 진행해주세요.',
            };
          }

          if (e.code === 400) {
            return { type: 'password', message: '입력값 확인이 필요함' };
          }
        }

        throw e;
      }
    },
    [],
  );

  return (
    <>
      <FormField>
        <Logo />
        <TitleWrap level={1}>로그인</TitleWrap>
        <SigninForm onSubmit={handleSignin} onClick={handleGoToFindPassword} />
        <GoggleButton onClick={handleGoToGoogleSignin}>
          <Google />
          Google 계정으로 로그인
        </GoggleButton>
      </FormField>

      <SignupText>
        Apro.go가 처음이라면{' '}
        <SignupButton onClick={handleGoToSignup}>회원가입</SignupButton>
      </SignupText>
    </>
  );
}

export default SigninContainer;
