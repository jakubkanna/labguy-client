import { Col } from "react-bootstrap";
import Layout from "../../components/layout/Layout.";
import { useLoaderData } from "react-router-dom";
import ProjectDisplay from "../../components/calendar/ProjectDisplay";
import { isUpcoming } from "../../utils/helpers";
import { Project } from "../Projects";

export default function Calendar() {
  const projects = useLoaderData() as Project[];

  // Separate projects into current and upcoming
  const currentProjects = projects.filter((project) => !isUpcoming(project));
  const upcomingProjects = projects.filter((project) => isUpcoming(project));

  // ProjectList component that maps over projects and returns ProjectDisplay components
  const ProjectList = ({ projects }: { projects: Project[] }) => {
    return (
      <div className="mh-100 overflow-auto">
        {projects.map((project) => (
          <ProjectDisplay key={project.id} project={project} />
        ))}
      </div>
    );
  };

  return (
    <Layout title="Calendar">
      <>
        <Col xs={12} md={6} className="mh-100 d-flex flex-column">
          <h6 className="text-center">Current</h6>
          <ProjectList projects={currentProjects} />
        </Col>
        <Col xs={12} md={6} className="mh-100 d-flex flex-column">
          <h6 className="text-center">Upcoming</h6>
          <ProjectList projects={upcomingProjects} />
        </Col>
      </>
    </Layout>
  );
}
