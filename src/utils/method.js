export function interpolate(inputNumber, { inputRange, outputRange }) {
  const firstInput = inputRange[0], lastInput = inputRange[1],
    firstOutput = outputRange[0], lastOutput = outputRange[1];
  return (inputNumber * ((lastOutput - firstOutput) / (lastInput - firstInput))) - firstOutput;
}