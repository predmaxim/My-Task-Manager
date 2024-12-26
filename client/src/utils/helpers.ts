export const upperCaseFirstLetter = (str: string) => {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
};

export const formatDate = (date: Date) => {
  return new Date(date).toISOString().slice(0, 10);
};

export const formatDateTimeLocal = (date: Date | string) => {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(date));
};

export const getContrastTextColor = (
  color: string,
  lightColor = '#ffffff',
  darkColor = '#1f1f1f',
) => {
  const value = color.trim();
  const rgbMatch = value.match(/rgba?\((\d+)[,\s]+(\d+)[,\s]+(\d+)/i);
  const hexMatch = value.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);

  let r = 0;
  let g = 0;
  let b = 0;

  if (rgbMatch) {
    r = Number(rgbMatch[1]);
    g = Number(rgbMatch[2]);
    b = Number(rgbMatch[3]);
  } else if (hexMatch) {
    const hex = hexMatch[1];
    const normalizedHex = hex.length === 3
      ? hex.split('').map((char) => char + char).join('')
      : hex;

    r = Number.parseInt(normalizedHex.slice(0, 2), 16);
    g = Number.parseInt(normalizedHex.slice(2, 4), 16);
    b = Number.parseInt(normalizedHex.slice(4, 6), 16);
  } else {
    return darkColor;
  }

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 145 ? lightColor : darkColor;
};
