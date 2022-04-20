exports.getRandomSlice = (arr, size) => {
  const rand = Math.floor(Math.random() * (arr.length - size)) % arr.length;
  return arr.slice(rand, (rand + size) % arr.length);
};

exports.dateToString = (date) => {
  const data = date,
    dia = data.getDate().toString(),
    diaF = dia.length == 1 ? "0" + dia : dia,
    mes = (data.getMonth() + 1).toString(),
    mesF = mes.length == 1 ? "0" + mes : mes,
    anoF = data.getFullYear();
  return anoF + "-" + mesF + "-" + diaF;
};

exports.dateStrToInt = (dateStr) => new Date(dateStr).getTime();
