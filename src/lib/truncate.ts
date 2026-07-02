export const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;

  const truncate = text.slice(0, maxLength);
  const lastSpace = truncate.lastIndexOf(" ");

  return truncate.slice(0, lastSpace) + "...";
};
