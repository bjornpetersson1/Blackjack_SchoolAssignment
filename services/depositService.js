import { GetValueFromComponent } from "./valueService.js";
import { gameState } from "../data/stateData.js";
import { ShowMessageScreen } from "../presentation/components/infoRender.js";
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
  if (isNaN(value)) {
    ShowMessageScreen("You tried to pass not a number", "info");
  } else {
    gameState.userState.balance += value;
  }
};
