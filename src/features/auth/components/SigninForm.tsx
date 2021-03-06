import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import { isEmail } from '@/features/auth/libs/validator';

import useInput from '@/features/auth/hooks/useInput';
import useBoolean from '@/features/auth/hooks/useBoolean';

import InputWithError from '@/features/auth/components/InputWithError';
import Button from '@/features/auth/components/Button';
import AutoSigninCheck from '@/features/auth/components/AutoSigninCheck';

const StyledInputWithError = styled(InputWithError)<{ errorMessage: string | undefined }>`
  display: block;

  &:nth-of-type(1) {
    margin-bottom: ${({ errorMessage }) => (errorMessage ? '1rem' : '2rem')};
  }

  &:nth-of-type(2) {
    margin-bottom: ${({ errorMessage }) => (errorMessage ? '1rem' : '1.5rem')};
  }
`;

const StyledForm = styled.form`
  margin-bottom: 3rem;
  width: 100%;
`;

const OptionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 2.75rem;

  & > div {
    cursor: pointer;
    font-size: 1.25rem;
  }
`;

export interface SigninFormProps {
  onSubmit: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void | { type: 'email' | 'password'; message: string }>;
  onClick: () => void;
}

function SigninForm(props: SigninFormProps) {
  const { onClick, onSubmit } = props;

  const [email, setEmail, isValidEmail] = useInput({
    validator: isEmail,
    preProcessor: (value) => {
      if (error !== undefined && error.type === 'email') setError(undefined);
      return value.trim();
    },
  });
  const [password, setPassword] = useInput({
    preProcessor: (value) => {
      if (error !== undefined && error.type === 'password') setError(undefined);
      return value.trim();
    },
  });

  const [autoSignin, toggleAutoSignin] = useBoolean({ defaultValue: false });
  const [error, setError] = useState<{ type: 'email' | 'password'; message: string } | undefined>();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (email === '') return setError({ type: 'email', message: '????????? ?????? ??????' });
      if (password === '') return setError({ type: 'password', message: '???????????? ?????? ??????' });
      if (!isValidEmail) return setError({ type: 'email', message: '????????? ?????? ?????? ??????' });
      if (error === undefined) {
        const result = await onSubmit({ email, password });
        if (result !== undefined) return setError({ type: result.type, message: result.message });
        localStorage.setItem('autoSignin', `${autoSignin}`);
      }
    },
    [email, password, isValidEmail, error, autoSignin, onSubmit],
  );

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledInputWithError
        value={email}
        onChange={setEmail}
        placeholder="?????????"
        errorMessage={error?.type === 'email' ? error.message : undefined}
      />
      <StyledInputWithError
        value={password}
        onChange={setPassword}
        type="password"
        placeholder="????????????"
        errorMessage={error?.type === 'password' ? error?.message : undefined}
      />
      <OptionsWrapper>
        <AutoSigninCheck checked={autoSignin} onChange={toggleAutoSignin} />
        <div onClick={onClick}>{`???????????? ?????? ->`}</div>
      </OptionsWrapper>
      <Button type="submit" disabled={error !== undefined} status="confirm">
        ?????????
      </Button>
    </StyledForm>
  );
}

export default SigninForm;
