import styles from './styles.module.scss';
import { ProjectList } from '@/components/project/project-list';

export function ProjectsPage() {

  return (
    <div className={`${styles.ProjectsPage} container`}>
      <ProjectList />
    </div>
  );
}
