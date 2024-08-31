import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PortfolioButton = ({ url }: { url?: string | null }) => {
  const navigate = useNavigate();

  function handleClick() {
    if (url) {
      // If a portfolio PDF URL is available, open it in a new tab
      window.open(url, "_blank");
    } else {
      // If no PDF is available, navigate to the contact tab
      navigate("/contact");
    }
  }

  return (
    <Button onClick={handleClick} variant="blue">
      {url ? "Download (PDF)" : "Request PDF"}
    </Button>
  );
};

export default PortfolioButton;
