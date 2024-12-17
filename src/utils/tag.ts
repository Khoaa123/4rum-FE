export const tag = (tag: string) => {
  switch (tag) {
    case "Thảo luận":
      return "border-sky-500 bg-[#dce7f5]";
    case "Thắc mắc":
      return "border-yellow-500 bg-yellow-100";
    case "Kiến thức":
      return "border-blue-500 bg-blue-100";
    default:
      return "";
  }
};
