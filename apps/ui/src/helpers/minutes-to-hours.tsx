export const minutesToHours = (minutes: number) => {
  if (isNaN(minutes)) return;
  return `${Math.floor(minutes / 60)} hours, ${minutes % 60} minutes`;
}