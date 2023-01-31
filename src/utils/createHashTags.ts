export const createHashTags = (text: string) => {
  const regex = /(#\w+)/g;

  const formattedText = text.replace(
    regex,
    (match: string) => `<span style="color:rgb(54 128 178)">${match}</span> `
  );

  return formattedText;
};
