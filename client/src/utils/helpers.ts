export const upperCaseFirstLetter = (str: string) => {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
};

export const formatDate = (date: Date) => {
  return new Date(date).toISOString().slice(0, 10);
};
