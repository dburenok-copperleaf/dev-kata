export function findOmitCharacter(groupString: string): string {
  let maxChar = "";
  let maxLength = 0;
  let currentChar = "";
  let currentLength = 0;

  for (let i = 0; i < groupString.length; i++) {
    if (groupString[i] === currentChar) {
      currentLength++;
    } else {
      if (currentLength > maxLength) {
        maxChar = currentChar;
        maxLength = currentLength;
      }
      currentChar = groupString[i];
      currentLength = 1;
    }
  }

  if (currentLength > maxLength) {
    maxChar = currentChar;
  }

  return maxChar;
}