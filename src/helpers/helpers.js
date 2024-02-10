// helpers.js
export const validate = (name, value) => {
  let error = "";

  switch (name) {
    case "title":
      if (value.trim().length < 3) {
        error = "Title must be at least 3 characters";
      }
      break;
    case "image":
      if (!value) {
        error = "Image is required";
      }
      break;
    case "description":
      if (value.trim().length < 3) {
        error = "Description must be at least 3 characters";
      }
      break;
    default:
      break;
  }

  return error;
};
