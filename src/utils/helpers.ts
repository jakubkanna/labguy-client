import {
  ImageRefSchema,
  VideoRefSchema,
} from "@jakubkanna/labguy-front-schema";
import { Project } from "../pages/Projects";

export type MediaRef = ImageRefSchema | VideoRefSchema | null;

function isVideo(media: MediaRef | null): media is VideoRefSchema {
  return media?.mediaType === "VIDEO";
}
function isImage(media: MediaRef | null): media is ImageRefSchema {
  return media?.mediaType === "IMAGE";
}
function isUpcoming(project: Project) {
  if (!project.start_date) return true;

  const currentDate = new Date();

  const { year = 0, month = 0, day = 0, time = "00:00" } = project.start_date;

  const [hours, minutes] = time.split(":").map(Number);

  const projectStartDate = new Date(year, month, day, hours || 0, minutes || 0);

  return projectStartDate > currentDate;
}

function isCurrent(project: Project) {
  // Ensure project.start_date is defined
  if (!project.start_date) return false;

  const currentDate = new Date();

  const { year = 0, month = 0, day = 0 } = project.start_date;

  // Create a date object for the project's start date
  const projectStartDate = new Date(year, month, day);

  // Get the current year and month
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Check if the project is happening in the current month and year
  return (
    projectStartDate.getFullYear() === currentYear &&
    projectStartDate.getMonth() === currentMonth
  );
}

import dayjs from "dayjs";

function parseDate(dateObj: { [k: string]: unknown } | null | undefined) {
  if (!dateObj) return "";

  const { year, month, day, time } = dateObj;

  return `${
    day
      ? dayjs()
          .set("date", day as number)
          .format("dddd") + ", "
      : ""
  }
  ${
    month
      ? dayjs()
          .set("month", month as number)
          .format("MMMM")
      : ""
  } ${year ? year : ""}${time ? ", " + time : ""}`;
}

export { isVideo, isImage, isUpcoming, isCurrent, parseDate };
