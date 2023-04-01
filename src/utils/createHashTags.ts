export const createHashTags = (text: string) => {
  const regex = /(#\w+)/g;

  const formattedText = text.replace(
    regex,
    (match: string) =>
      `<a href="/hashtag/${match}" target="_blank_"><span style="color:rgb(54 128 178); cursor: pointer">${match}</span></a>`
  );

  return formattedText;
};
