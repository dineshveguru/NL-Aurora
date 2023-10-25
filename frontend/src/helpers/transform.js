function transform(data) {
  const nums = [];
  const strings = [];
  const columns = data.length > 0 ? Object.keys(data[0]) : [];
  if (columns.length > 1) {
    columns.forEach((col) => {
      if (typeof data[0][col] == "number") {
        nums.push(col);
      } else if (typeof data[0][col] == "string") {
        strings.push(col);
      }
    });
    return { nums, strings };
  }
  return { nums, strings };
}

export default transform;
