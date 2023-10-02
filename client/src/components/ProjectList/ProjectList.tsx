import { getProjects } from 'backend/controllers/projectController';
import './ProjectList.scss';

export async function ProjectList() {
  const projects = await getProjects();

  return (
    <div className="ProjectList">
      {projects.map((el) => {
        return <button onClick={() => console.log(el.name)}></button>
      })}
    </div>
  );
}
