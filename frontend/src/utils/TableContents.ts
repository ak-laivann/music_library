import moment from "moment-timezone";

export function convertDurationInSecondsToRequiredFormat(
  durationInSeconds: number
) {
  return moment.utc(durationInSeconds * 1000).format("HH:mm:ss");
}

export function convertSizeInBytesToMB(sizeInBytes: number) {
  return (sizeInBytes / (1024 * 1024)).toFixed(2) + " MB";
}

export function convertReleasedOnDateToRequiredFormat(releasedOn: string) {
  return moment(releasedOn).format("DD MMM YYYY, hh:mm A");
}
