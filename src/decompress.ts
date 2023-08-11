import { delineator, groupDelineator, hexChars, test } from "./constants/algo-constants";

const lowerCaseGCode = 103;
const upperCaseACode = 65;

export function decompressString(compressedString: string): string {
  if (compressedString === '') {
    return '';
  }

  const groups: string[] = compressedString.split(groupDelineator);
  const decompressedGroups: string[] = groups.map((group) => decompressGroup(group));

  return '0x' + decompressedGroups.join("");
}

// Takes in a single compressed group as a string and returns it as a decompressed string
function decompressGroup(group: string): string {
  const [omitString, dataString] = group.split(delineator);
  const result = [];

  let i = 0;
  while (i < dataString.length) {
    const currentChar = dataString[i];
    if (!isCountCharacter(currentChar)) {
      result.push(currentChar);
      i++;
      continue;
    }

    let sum = getSpecialCharNumber(currentChar);
    i++;
    while (i < dataString.length && isCountCharacter(dataString[i])) {
      sum += getSpecialCharNumber(dataString[i]);
      i++;
    }

    for (let i = 0; i < sum; i++) {
      result.push(omitString);
    }
  }

  return result.join("");
}

function getSpecialCharNumber(specialChar: string): number {
  const code = specialChar.charCodeAt(0);

  if (isLowercase(code)) {
    return code - lowerCaseGCode + 1;
  } else {
    return code - upperCaseACode + 21;
  }
}

// This function assumes that valid lowercase characters are g-z 
function isLowercase(code: number): boolean {
  return code >= lowerCaseGCode;
}

function isCountCharacter(char: string): boolean {
  return !hexChars.has(char);
}


function testSuite() {
  test(getSpecialCharNumber("g"), 1)
  test(getSpecialCharNumber("g"), 1);
  test(getSpecialCharNumber("z"), 20);
  test(getSpecialCharNumber("A"), 21);

  test(decompressString("f:aibe"), "afffbe");
  test(decompressString("f:ai"), "afff");
  test(decompressString("f:ia"), "fffa");
  test(decompressString("f:iaiaia"), "fffafffafffa");
  test(decompressString("f:iaiaia;fia"), "fffafffafffafffa");

  test(decompressString("a:g;a:g;a:g;"), "aaa");
}

// testSuite();