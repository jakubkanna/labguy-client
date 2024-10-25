import {
  ImageRefSchema,
  VideoRefSchema,
} from "@jakubkanna/labguy-front-schema";

export type MediaRef = ImageRefSchema | VideoRefSchema | null;

function isVideo(media: MediaRef) {
  return media?.mediaType === "VIDEO";
}
function isImage(media: MediaRef) {
  return media?.mediaType === "IMAGE";
}

export { isVideo, isImage };
