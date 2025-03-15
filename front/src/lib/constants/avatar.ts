export function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

export function stringAvatar(name: string) {
  const initials = name
    .split(" ")
    .map((n) => {
      // if Korean
      if (/[\u3131-\uD79D]/.test(n)) {
        return n[0]; // first character of Korean
      } else {
        return n[0]; // first character of English
      }
    })
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: initials,
  };
}