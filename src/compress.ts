import { delineator, groupDelineator } from "./constants/algo-constants";
import { findOmitCharacter, splitToGroups } from "./helpers";


// const sample = '0xfefefffffffffffeeffffffffffffffffffffefe';


function sanitize(text: string): string {
  const toLower = (text ?? '').toLowerCase();
  return toLower.length > 0 ? toLower.substring(2, text.length) : '';
}

function encode(text: string, omitChar: string): string {
  const encodedText = processGroup(text, omitChar);
  return `${omitChar}${delineator}${encodedText}`;
}

function toCountCharacter(count: number): string {
  const limit = 46;
  const lowerAUnicodeValue = 97;
  const upperAUnicodeValue = 65;
  const lowercaseOffset = 20;

  const groupNumber = Math.floor(count / limit);
  const remainder = count % 46;
  const results = [];

  for (let i = 1; i <= groupNumber; i++) {
    results.push('Z');
  }

  if (remainder > 0) {
    let character;
    if (remainder > lowercaseOffset) {
      const alphabetIndex = remainder - lowercaseOffset - 1;
      character = String.fromCharCode(upperAUnicodeValue + alphabetIndex);
    } else {
      const gOffset = 6;
      const alphabetIndex = remainder + gOffset - 1;
      character = String.fromCharCode(lowerAUnicodeValue + alphabetIndex);
    }
    results.push(character);
  }

  return results.join('');
}

function processGroup(text: string, target: string): string {
  let count = 0;
  let result = '';

  for (let i = 0; i < text.length; i++) {
    const match = text[i] === target;

    if (match) {
      count++;
    } else {
      if (count > 0) {
        result += toCountCharacter(count);
      }
      result += text[i];
      count = 0;
    }
  }
  if (count > 0) {
    result += toCountCharacter(count);
  }
  // console.log({ result })

  return result;
}

export function compressHex(text: string): string {
  if (text === '') {
    return '';
  }

  const cleaned = sanitize(text);
  const chunks = splitToGroups(cleaned);
  // console.log({chunks}) // good

  const results = chunks.map((chunk) => {
    const omitChar = findOmitCharacter(chunk);
    return encode(chunk, omitChar);
  });
  return results.join(groupDelineator);
}
