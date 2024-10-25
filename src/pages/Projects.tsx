import { useLoaderData, useParams, Outlet } from "react-router-dom";
import {
  GeneralSectionSchema,
  ProjectSchema,
  UrlSchema,
} from "@jakubkanna/labguy-front-schema";
import Layout from "../components/layout/Layout.";
import ProjectCard from "../components/ProjectCard";
import { Container } from "react-bootstrap";
import { Work } from "./Works";
import { MediaRef } from "../utils/helpers";

export interface Project extends ProjectSchema {
  general: GeneralSectionSchema;
  media: MediaRef[];
  urls: UrlSchema[];
  works: Work[];
}

export default function Projects() {
  const data = (useLoaderData() as Project[]) || null;
  const { slug } = useParams();

  if (!data) return null;

  return (
    <>
      {slug ? (
        <Outlet />
      ) : (
        <Layout title={"Projects"}>
          <Container className="d-flex flex-column gap-4">
            {data.map(
              (item, i) =>
                item.general.published && <ProjectCard project={item} key={i} />
            )}
          </Container>
        </Layout>
      )}
    </>
  );
}
