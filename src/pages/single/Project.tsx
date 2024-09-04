import { useLoaderData } from "react-router-dom";
import Layout from "../../components/layout/Layout.";
import { Col, Container, Row } from "react-bootstrap";
import { Project as ProjectSchema } from "../Projects";
import { Link } from "react-router-dom";
import Image from "../../components/Image";
import WorkCard from "../../components/WorkCard";
import Video from "../../components/Video";
import HTMLReactParser from "html-react-parser/lib/index";
import dayjs from "dayjs";

export default function Project() {
  const data = (useLoaderData() as ProjectSchema) || null;

  if (!data) return null;

  const {
    general,
    subtitle,
    start_date,
    end_date,
    venue,
    urls,
    images,
    videos,
    works,
    text,
  } = data;

  if (!general.published) return "This page is private.";

  return (
    <Layout title={general.title}>
      <Container className="d-flex flex-column gap-4">
        <Row>
          <Col xs={6}>
            <p>
              {start_date && (
                <>
                  {dayjs(start_date).format("DD MMM YYYY")} -{" "}
                  {end_date ? dayjs(end_date).format("DD MMM YYYY") : "N/A"}
                </>
              )}
            </p>
            <p>{subtitle}</p>
            <p>{venue}</p>
            <>{text && HTMLReactParser(text as string)}</>
            {works.length > 0 && (
              <p>
                <span>Works: </span>
                {works.map((w) => (
                  <span key={w.general.slug}>
                    <Link to={"/works/" + w.general.slug}>
                      {w.general.title}
                    </Link>
                    {works.length > 1 && <span>, </span>}
                  </span>
                ))}
              </p>
            )}
          </Col>
        </Row>
        <Row className="gap-3">
          {images &&
            images.map((img) => (
              <Col xs={12} key={img.etag}>
                <Image imageref={img} />
              </Col>
            ))}
        </Row>
        <Row className="gap-3">
          {videos &&
            videos.map((video) => (
              <Col xs={12} key={video.etag}>
                <Video videoref={video} />{" "}
              </Col>
            ))}
        </Row>
        <Row className="gap-3">
          {works.length > 0 &&
            works.map((w) => (
              <Col xs={12} key={w.id}>
                <WorkCard work={w} />{" "}
              </Col>
            ))}
        </Row>

        <Row>
          <Col>
            <span>Related: </span>
            {urls.length > 0 &&
              urls.map((url) => (
                <span key={url.id}>
                  <Link to={url.url} target="_blank">
                    {url.title}
                  </Link>
                  {urls.length > 0 && <span>, </span>}
                </span>
              ))}
            <Link to={"/projects"}>All Projects</Link>
          </Col>
        </Row>
        <Row>
          <Col></Col>
        </Row>
      </Container>
    </Layout>
  );
}
