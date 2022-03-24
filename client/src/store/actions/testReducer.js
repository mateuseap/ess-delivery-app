// type = ação sendo realizada
export function toggleTestState(data) {
  return {
    type: 'TOGGLE_TEST_STATE',
    payload: data
  };
}
