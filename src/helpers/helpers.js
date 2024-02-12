// helpers.js
export const validate = (name, value) => {
  let error = "";

  switch (name) {
    case "title":
      if (value.trim().length < 3) {
        error = "Başlıq ən azı 3 simvoldan ibarət olmalıdır";
      }
      break;
    case "image":
      if (!value) {
        error = "Şəkil tələb olunur";
      }
      break;
    case "description":
      if (value.trim().length < 8) {
        error = "Təsvir ən azı 8 simvoldan ibarət olmalıdır";
      }
      break;
    default:
      break;
  }

  return error;
};
