import styled from 'styled-components';
import React from 'react';
import { LineButton } from '@ui';
import type { DayValue } from '@hassanmojab/react-modern-calendar-datepicker';
import { Star } from '@assets/images';

import { ProjectInviteModal } from './ProjectInviteModal';
import { ProjectInformation } from './ProjectInformation';
import { IconGenerator } from './IconGenerator';
import {
  IconGeneratorType,
  PickerChangeHandlerArgs,
} from '../../containers/StudioCreateFormContainer';

const CreateFormWrap = styled.form``;

const FieldGroup = styled.div`
  padding: 6px 0;
  border: 1.5px solid ${({ theme }) => theme.colors.gray1};
  border-radius: 5px;
`;

export const Field = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1.5px solid #e3e3e3;
  padding: 22px 28px;

  &:last-child {
    border-bottom: none;
  }
`;

export const Label = styled.label`
  display: flex;
  white-space: nowrap;
  max-width: 110px;
  width: 100%;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  margin-right: 68px;
`;

const FormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const FooterExtraText = styled.small`
  color: #666666;
`;

const FooterButtons = styled.span`
  display: flex;
  gap: 8px;
  width: 241px;
`;

export const RequiredIcon = styled.span`
  content: url(${Star});
  width: 12px;
  height: 12px;
  margin-left: 2px;
  margin-top: 3px;
`;

interface CreateFormProps {
  startDate: DayValue;
  endDate: DayValue;
  onPickerChange: (args: PickerChangeHandlerArgs) => void;

  iconGeneratorType: IconGeneratorType | null;
  onGeneratorTypeClick: (type: IconGeneratorType | null) => void;

  isInviteModalVisible: boolean;
  onInviteModalVisibleToggle: (value?: boolean) => void;
}

export const CreateForm = ({
  endDate,
  startDate,
  onPickerChange,

  iconGeneratorType,
  onGeneratorTypeClick,

  isInviteModalVisible,
  onInviteModalVisibleToggle,
}: CreateFormProps) => {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <CreateFormWrap onSubmit={handleSubmit}>
        <FieldGroup>
          <ProjectInformation
            startDate={startDate}
            endDate={endDate}
            onPickerChange={onPickerChange}
          />
          <IconGenerator
            onGeneratorTypeClick={onGeneratorTypeClick}
            iconGeneratorType={iconGeneratorType}
          />
          <ProjectInviteModal
            isVisible={isInviteModalVisible}
            onToggle={onInviteModalVisibleToggle}
          />
        </FieldGroup>
      </CreateFormWrap>

      <FormFooter>
        <FooterExtraText>
          *프로젝트 정보는 프로젝트를 만든 후에도 수정할 수 있어요.
        </FooterExtraText>

        <FooterButtons>
          <LineButton>취소</LineButton>
          <LineButton variant="primary">프로젝트 만들기</LineButton>
        </FooterButtons>
      </FormFooter>
    </>
  );
};
