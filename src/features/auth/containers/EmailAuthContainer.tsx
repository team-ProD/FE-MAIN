import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { Title } from '@ui';

import { Logo } from './SigninContainer';
import { EmailAuthForm } from '../components/EmailAuthForm';

const Wrap = styled.article`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};

  width: 448px;
  height: 601px;
  padding: 48px 40px;
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  border-radius: 6px;
`;

const TitleStyled = styled(Title)`
  margin-bottom: 20px;
`;

export interface EmailAuthContainerProps {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function EmailAuthContainer(_: EmailAuthContainerProps) {
  const navigate = useNavigate();

  const handleRetryEmailClick = useCallback(() => {
    // TODO: 이메일 보내는 로직
    navigate('/auth/complete');
  }, [navigate]);

  return (
    <Wrap>
      <Logo />
      <TitleStyled level={1}>이메일 인증</TitleStyled>
      <EmailAuthForm onRetryEmailClick={handleRetryEmailClick} />
    </Wrap>
  );
}

export default EmailAuthContainer;
