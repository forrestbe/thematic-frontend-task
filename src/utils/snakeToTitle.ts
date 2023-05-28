const firstLetterUppercase = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const snakeToTitle = (str: string): string => {
  const normalCase = str
    .split('_')
    .map((word: string) => firstLetterUppercase(word))
    .join(' ');

  return firstLetterUppercase(normalCase);
};

export { snakeToTitle, firstLetterUppercase }