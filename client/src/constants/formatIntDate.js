export const formatTimeWithIntl = (time) => {
  const [hour, minute] = time.split(":");
  const date = new Date();
  date.setHours(hour, minute);

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};
