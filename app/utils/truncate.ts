export const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).split(" ").slice(0, -1).join(" ") + "...";
};
