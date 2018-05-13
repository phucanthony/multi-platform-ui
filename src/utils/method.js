export function interpolate(inputNumber, { inputRange, outputRange }) {
  const firstInput = inputRange[0], lastInput = inputRange[1],
    firstOutput = outputRange[0], lastOutput = outputRange[1];
  if (inputNumber <= firstInput) {
    return firstOutput;
  } else if (inputNumber >= lastInput) {
    return lastOutput;
  }
  return (((inputNumber - firstInput) * ((lastOutput - firstOutput) / (lastInput - firstInput)))) + firstOutput;
}