import { GetValueFromComponent } from "./valueService.js";
import { gameState } from "../data/stateData.js";
export const CalculatorLogic = (expressionContainer, valueSource, button) => {
  const key = button.dataset.key;
  if (key === "C") {
    expressionContainer = "";
  } else if (key === "=") {
    expressionContainer = String(eval(expressionContainer));
  } else {
    expressionContainer += key;
  }
  valueSource.value = expressionContainer;
  return expressionContainer;
};
export const HandleStringToNumTransfer = (valueOriginId) => {
  const value = Math.round(Number(GetValueFromComponent(valueOriginId)));
  gameState.userState.balance += value;
};
