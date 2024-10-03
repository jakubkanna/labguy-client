import { useLoaderData } from "react-router-dom";
import Layout from "../../components/layout/Layout.";
import { Col, Container, Row } from "react-bootstrap";
import { Work as WorkSchema } from "../Works";
import Image from "../../components/Image";
import Video from "../../components/Video";
import { Link } from "react-router-dom";

export default function Work() {
  const data = (useLoaderData() as WorkSchema) || null;

  if (!data) return null;

  const { general, dimensions, medium, year, images, videos } = data;

  if (!general.published) return "This page is private.";

  return (
    <Layout title={general.title}>
      <Container className="d-flex flex-column gap-4">
        {/* Display Dimensions and Year */}
        <Row>
          <Col xs={12}>
            <p id="Details">
              {medium && <span>Medium: {medium}</span>}
              {dimensions && <span>Dimensions: {dimensions} (cm)</span>}
              {year && <span>Year: {year}</span>}
            </p>
          </Col>
        </Row>

        {/* Display Images */}
        <Row className="gap-3">
          {images &&
            images.map((img) => (
              <Col xs={12} key={img.etag}>
                <Image imageref={img} />
              </Col>
            ))}
        </Row>

        {/* Display Videos */}
        <Row className="gap-3">
          {videos &&
            videos.map((video) => (
              <Col xs={12} key={video.etag}>
                <Video videoref={video} />
              </Col>
            ))}
        </Row>

        {/* Footer Section */}
        <Row>
          <Col>
            <span>Related: </span>

            <Link to={"/works"}>All Works</Link>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
