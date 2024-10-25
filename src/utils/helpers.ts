import {
  ImageRefSchema,
  VideoRefSchema,
} from "@jakubkanna/labguy-front-schema";

export type MediaRef = ImageRefSchema | VideoRefSchema | null;

function isVideo(media: MediaRef | null): media is VideoRefSchema {
  return media?.mediaType === "VIDEO";
}
function isImage(media: MediaRef | null): media is ImageRefSchema {
  return media?.mediaType === "IMAGE";
}

export { isVideo, isImage };
