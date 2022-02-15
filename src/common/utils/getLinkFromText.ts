import convertToUrl from 'transliterate-cyrillic-text-to-latin-url';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
export const getLinkFromText = (text: string): string => convertToUrl(text);
