import styled from 'styled-components';

import { Title } from '@/components';
import { ProjectCard } from '../components';
import MOCK_PROJECT_ITEMS from '../_fixtures/projectItems.json';

const Wrap = styled.div`
  width: 100%;
  padding: 24px;
`;
const ProjectHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 24px;
`;
const ProjectTitle = styled(Title)``;
const ProjectCreateButton = styled.button`
  padding: 4px 8px;
  cursor: pointer;
`;
const ProjectCardWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`;

export type ProjectStatus = 'wait' | 'invited' | 'create' | 'ended';
export interface ProjectItem {
  id: number;
  projectName: string;
  status: ProjectStatus;
  totalMember: number;
  createDate: string;
}

export const StudioMain = () => {
  const projects = (MOCK_PROJECT_ITEMS as ProjectItem[]).reduceRight((acc, cur) => {
    if (cur.status === 'wait') {
      acc.unshift(cur);
      return acc;
    }
    acc.push(cur);
    return acc;
  }, [] as ProjectItem[]);

  return (
    <Wrap>
      <ProjectHeader>
        <ProjectTitle level={1}>내 프로젝트</ProjectTitle>
        <ProjectCreateButton>
          <span>+</span>새로운 프로젝트
        </ProjectCreateButton>
      </ProjectHeader>

      <ProjectCardWrap>
        {projects.map(({ id, createDate, projectName, status, totalMember }) => (
          <ProjectCard
            key={id}
            id={id}
            projectName={projectName}
            status={status as ProjectStatus}
            totalMember={totalMember}
            createDate={createDate}
          />
        ))}
      </ProjectCardWrap>
    </Wrap>
  );
};
