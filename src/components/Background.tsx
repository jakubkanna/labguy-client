import {
  ImageRefSchema,
  VideoRefSchema,
} from "@jakubkanna/labguy-front-schema";
import Image from "./Image";
import Video from "./Video";

interface BackgroundProps {
  bgImgRef?: ImageRefSchema[];
  bgVideoRef?: VideoRefSchema[];
}

const Background: React.FC<BackgroundProps> = ({ bgImgRef, bgVideoRef }) => {
  // Check if image data exists and is not null
  if (bgImgRef && bgImgRef.length > 0) {
    return (
      <Image className="w-100 h-100 object-fit-cover" imageref={bgImgRef[0]} />
    );
  }

  // Check if video data exists and log it if true
  if (bgVideoRef && bgVideoRef.length > 0) {
    return <Video videoref={bgVideoRef[0]} />;
  }

  return null;
};

export default Background;
