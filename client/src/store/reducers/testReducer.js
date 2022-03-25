const INITIAL_STATE = {
  outroCampo: "",
  name: "",
  sla: [
    {
      id: 1,
      teste: "teste",
    },
    {
      id: 2,
      teste: "teste2",
    },
  ],
};

// função que chama o estado inicial
// state = estado anterior a ação
export default function testReducer(state = INITIAL_STATE, action) {
  if (action.type === "TOGGLE_TEST_STATE") {
    return {
      ...state,
      sla: action.sla,
    };
  }

  return state;
}
