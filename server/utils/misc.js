exports.getRandomSlice = (arr, size) => {
  const rand = Math.floor(Math.random() * (arr.length - size)) % arr.length;
  return arr.slice(rand, (rand + size) % arr.length);
};
