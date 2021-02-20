export const REGEX = {
    NEW_LINE: /\r?\n|\r/,
    COMMAND: /^\/[a-z]+/,
    DIGITS: /(-?[0-9]+([.][0-9]*)?|[.][0-9]+)/,
    DIGITS_IN_BRACES: /\((-?[0-9]+)\)/,
    WORDS: /([аАaA-яЯzZ]+ ?)+/,
    COMMAS: /,/g,
} as const;
