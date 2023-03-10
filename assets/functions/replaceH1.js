const replaceHeading = (json) => {
  const jsonRaw = JSON.stringify(json).replace("heading1", "heading2");
  return JSON.parse(jsonRaw);
};
export default replaceHeading;
