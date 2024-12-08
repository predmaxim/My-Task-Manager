import { CreateNewProject } from '@/components/project/create-new-project';
import { useAppSelector } from '@/lib/store';
import { Loading } from '@/components/layout/loading';
import styles from './styles.module.scss';
import { ProjectItem } from '@/components/project/projects-item';

export type ProjectListType = {
  modalAction?: () => void;
};

export function ProjectList({ modalAction }: ProjectListType) {
  const { projects, isLoading } = useAppSelector((state) => state.projects);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.ProjectList}>
      <CreateNewProject />
      {projects?.length ? (
        <div className={styles.list}>
          {projects.map((project) => (
            <ProjectItem project={project} key={project.id} modalAction={modalAction} />
          ))}
        </div>
      ) : (
        <p className={styles.ProjectList__noProjects}>Create your first project</p>
      )}
    </div>
  );
}
