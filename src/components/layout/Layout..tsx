import { ReactNode, useContext } from "react";
import { Row } from "react-bootstrap";
import { GeneralContext } from "../../contexts/GeneralContext";
import { Helmet } from "react-helmet";

export default function Layout({
  children,
  title,
  description,
}: {
  children: ReactNode;
  title?: string;
  description?: string;
}) {
  const { preferences } = useContext(GeneralContext);

  const metadata = {
    title: title || preferences?.artists_name || "Untitled",
    description: description,
    name: preferences?.artists_name,
  };

  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="author" content={metadata.name} />
      </Helmet>
      <Row id="SinglePageHeader" className="justify-content-center">
        {title && <h5 className="text-center">{title}</h5>}{" "}
      </Row>{" "}
      <Row id="SinglePageContent" className="overflow-hidden h-100">
        {children}
      </Row>
      <Row id="SinglePageFooter"></Row>
    </>
  );
}
