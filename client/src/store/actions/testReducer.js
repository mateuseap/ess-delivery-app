// type = ação sendo realizada
export function toggleTestState(data) {
  const last = data.length;
  data.push({
    id: last + 1,
    teste: `teste${last + 1}`,
  });
  return {
    type: "TOGGLE_TEST_STATE",
    sla: data,
  };
}
