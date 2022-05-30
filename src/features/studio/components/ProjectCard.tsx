import styled from 'styled-components';

import { SAMPLE_IMAGE } from '../constants';
import { ProjectItem, ProjectStatus } from '../routes';

const Wrap = styled.div`
  padding: 12px;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
`;
const ProjectCardBody = styled.div`
  display: flex;
`;
const ProjectImage = styled.div`
  width: 80px;
  height: 80px;
  margin-right: 12px;

  img {
    width: 100%;
    height: 100%;
  }
`;
const ProjectInfo = styled.div`
  line-height: 24px;
`;
const ProjectName = styled.div`
  font-size: 14px;
  font-weight: 700;
`;
const ProjectCreateDate = styled.div`
  font-size: 12px;
`;
const ProjectMember = styled.div`
  font-size: 13px;
`;
const ProjectCardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
`;
const ProjectCardMessage = styled.span`
  font-size: 13px;
`;
const ProjectCardButton = styled.button`
  background-color: #333;
  color: #fff;
  padding: 4px 12px;
  cursor: pointer;

  &:disabled {
    opacity: 0.3;
    pointer-events: none;
  }
`;

interface ProjectStatusValue {
  message: string;
  buttonText: string;
  disabled?: boolean;
}

const STATUS_DIC: Record<ProjectStatus, ProjectStatusValue> = {
  // TODO: 임시, 명세 나올 시 수정 필수 - chkim
  wait: { message: '00 님의 초대', buttonText: '수락하기' },
  invited: { message: '참여중', buttonText: '입장하기' },
  create: { message: '운영중', buttonText: '입장하기' },
  ended: { message: '종료', buttonText: '입장하기', disabled: true },
};

interface ProjectCardProps extends ProjectItem {}

export const ProjectCard = ({ id, createDate, projectName, status, totalMember }: ProjectCardProps) => {
  return (
    <Wrap>
      <ProjectCardBody>
        <ProjectImage>
          <img src={SAMPLE_IMAGE} alt="project image" />
        </ProjectImage>
        <ProjectInfo>
          <ProjectName>{projectName}</ProjectName>
          <ProjectCreateDate>{createDate}</ProjectCreateDate>
          <ProjectMember>현재 {totalMember}명이 함께하는 중</ProjectMember>
        </ProjectInfo>
      </ProjectCardBody>

      {/* TODO: divider로 변환 */}
      <hr />

      <ProjectCardFooter>
        <ProjectCardMessage>{STATUS_DIC[status].message}</ProjectCardMessage>
        <ProjectCardButton disabled={STATUS_DIC[status].disabled}>{STATUS_DIC[status].buttonText}</ProjectCardButton>
      </ProjectCardFooter>
    </Wrap>
  );
};
