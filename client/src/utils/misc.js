import { useLocation, useNavigate, useParams } from "react-router-dom";

export function formatMoney(amount, format = "pt-BR", currency = "BRL") {
  return new Intl.NumberFormat(format, {
    style: "currency",
    currency: currency,
  }).format(amount);
}

export function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}
export const divideArray = (arr, elementsPerIndex = 3) =>
  new Array(Math.ceil(arr.length / elementsPerIndex))
    .fill()
    .map(() => arr.splice(0, elementsPerIndex));
