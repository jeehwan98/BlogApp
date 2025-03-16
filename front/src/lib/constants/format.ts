export function generateUniqueUserId(email: string): string {
  const [username, domainUrl] = getId(email);
  const domain = getDomain(domainUrl);
  return `${username}_${domain}`;
}

export function getId(email: string): [string, string] {
  return email.split("@") as [string, string];
}

export function getDomain(emailUrl: string): string {
  return emailUrl.split(".")[0];
}

export function getDomainAndUsername(username: string, domain: string): string {
  return `${username}@${domain}.com`;
}

export function convertIdToEmail(userId: string): string {
  const [username, domain] = userId.split("_");
  return getDomainAndUsername(username, domain);
}

export function splitUnderBar(userId: string): [string, string] {
  return userId.split("_") as [string, string];
}

export function capitalizeFirstLetter(input: string) {
  return input.split('')[0].toUpperCase() + input.slice(1);
}

export function formatDate(localDateTimeArray: number[]) {
  const [year, month, day, hour, minute, second] = localDateTimeArray;
  const date = new Date(year, month - 1, day, hour, minute, second);

  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateWithTime(localDateTimeArray: number[]) {
  if (!Array.isArray(localDateTimeArray) || localDateTimeArray.length < 6) {
    return "Invalid date";
  }

  const [year, month, day, hour, minute, second] = localDateTimeArray;
  const date = new Date(year, month - 1, day, hour, minute, second);

  const formattedDate = `${year}/${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}`;
  const formattedTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;

  return `${formattedDate} ${formattedTime}`;
}

export function formatRelativeDate(localDateTimeArray: Date) {
  if (!Array.isArray(localDateTimeArray) || localDateTimeArray.length < 3) {
    return "Invalid date";
  }

  const [year, month, day, hour = 0, minute = 0, second = 0] = localDateTimeArray;
  const createdDate = new Date(year, month - 1, day, hour, minute, second);
  const today = new Date();

  // difference in milliseconds
  const diffInMs = today.getTime() - createdDate.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60)); // Convert ms to minutes
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  // < 1 hour, show "방금 전"
  if (diffInMinutes < 60) {
    return diffInMinutes === 0 ? "방금 전" : `${diffInMinutes}분 전`;
  }

  // < 1 day, show "__시간 전"
  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }

  // < 7 days, show "__일 전"
  if (diffInDays < 7) {
    return `${diffInDays}일 전`;
  }

  // otherwise, show the full date
  return createdDate.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}