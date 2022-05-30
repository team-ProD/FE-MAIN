import styled from 'styled-components';

import { SAMPLE_IMAGE } from '@/features/studio/constants';

const Wrap = styled.header`
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #f0f0f0;
  padding: 0 12px;
`;

const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
`;

const UserProfileImage = styled.span`
  width: 35px;
  height: 35px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

export const Header = () => {
  return (
    <Wrap>
      <HeaderInner>
        <UserProfileImage>
          <img src={SAMPLE_IMAGE} alt="user profile image" />
        </UserProfileImage>
      </HeaderInner>
    </Wrap>
  );
};
