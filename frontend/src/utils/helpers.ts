export const formatDate = (date: string): string => {
  return new Date(date).toString().slice(4, 24);
};
