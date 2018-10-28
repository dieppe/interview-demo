export const ERRORS = {
  NO_COUNTRY_SELECTED: 0,
  WRONG_LETTER: 1,
  WRONG_LENGTH: 2,
  WRONG_FORMAT: 3,
};

const UNAMBIGUOUS_LETTERS = [
  'C', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N',
  'P', 'R', 'T', 'V', 'W', 'X', 'Y', 'Z'
];

function findAmbiguousLetters (passportID) {
  const passportIDLetters = passportID.split('');
  const wrongLetters = passportIDLetters.reduce(
    (acc, letter) => {
      if (!UNAMBIGUOUS_LETTERS.contains(letter)) {
        acc = [...acc, letter];
      }
      return acc;
    },
    []
  );
  return wrongLetters;
}

function validateBrazil (passportID) {
  if (passportID.length !== 8) {
    return {
      valid: false,
      error: ERRORS.WRONG_LENGTH,
      detail: [ 'Should be 8 characters' ],
    };
  }
  const firstTwo = passportID.substring(0, 2);
  const last = passportID.substring(2);
  const ambiguousLetters = findAmbiguousLetters(firstTwo);
  if (ambiguousLetters.length > 0) {
    return {
      valid: false,
      error: ERRORS.WRONG_LETTER,
      detail: ambiguousLetters,
    };
  }
  if (/^[0-9]*$/.test(last)) {
    return { valid: true };
  }
  return { valid: false, error: ERRORS.WRONG_FORMAT };
}

function validateFrance (passportID) {
  if (passportID.length !== 9) {
    return {
      valid: false,
      error: ERRORS.WRONG_LENGTH,
      detail: [ 'Should be 9 characters' ],
    };
  }
  const ambiguousLetters = findAmbiguousLetters(passportID.replace(/[0-9]/, ''));
  if (ambiguousLetters.length === 0) {
    return { valid: true };
  }
  return { valid: false, error: ERRORS.WRONG_LETTER, detail: ambiguousLetters };
}

export function validate (country, passportID) {
  if (country === 'Brazil') {
    return validateBrazil(passportID);
  }
  else if (country === 'France') {
    return validateFrance(passportID);
  }
  return { valid: false, error: ERRORS.NO_COUNTRY_SELECTED };
}