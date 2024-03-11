export const formatTime = (time?: string) => {
  if (!time) {
    return "";
  }
  const date = new Date(time);
  return date.toLocaleTimeString("fr-FR", {
    timeZone: "America/Toronto",
    hour: "2-digit",
    minute: "2-digit",
  });
};
