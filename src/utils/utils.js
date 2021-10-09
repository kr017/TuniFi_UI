export const isPresent = (list, id) => {
  if (list) {
    return list.find(item => {
      if (item?._id === id) return true;
    });
  }
  return false;
};
