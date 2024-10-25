import { Outlet, useLoaderData, useParams } from "react-router-dom";
import {
  GeneralSectionSchema,
  WorkSchema,
} from "@jakubkanna/labguy-front-schema";
import Layout from "../components/layout/Layout.";
import WorkCard from "../components/WorkCard";
import { Col } from "react-bootstrap";
import { MediaRef } from "../utils/helpers";

export interface Work extends WorkSchema {
  general: GeneralSectionSchema;
  media: MediaRef[];
}

export default function Works() {
  const data = (useLoaderData() as Work[]) || null;
  const { slug } = useParams();

  if (!data) return null;

  return (
    <>
      {slug ? (
        <Outlet />
      ) : (
        <Layout title={"Works"}>
          <Col xs={12} md={6} lg={3}>
            {data.map(
              (item, i) =>
                item.general.published && <WorkCard work={item} key={i} />
            )}
          </Col>
        </Layout>
      )}
    </>
  );
}
