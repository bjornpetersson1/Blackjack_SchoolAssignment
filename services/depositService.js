export const CalculatorLogic = (expressionContainer, valueSource) => {
  const key = btn.dataset.key;
  if (key === "C") {
    expressionContainer = "";
  } else if (key === "=") {
    expressionContainer = String(eval(expressionContainer));
  } else {
    expressionContainer += key;
  }
  valueSource = expressionContainer;
};

export const ResetDepositView = (valueSource, expressionContainer) => {
  valueSource = "";
  expressionContainer = "";
};

export const HandleStringToNumTransfer = (valueOriginId, ValueDestination) => {
  const value = Math.round(Number(GetValueFromComponent(valueOriginId)));
  ValueDestination += value;
};
