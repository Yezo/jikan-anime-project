//Helper functions
export function removeExtraDate(url: string) {
  return url && url.split("to")[0].replace(/\s*$/, "");
}

export function removeWrittenByMALRewrite(url: string) {
  return url && url.split("[Written by MAL Rewrite]")[0].replace(/\s*$/, "");
}

// export function truncateString(str: string, num: number) {
//   const trimmedString = str && str.slice(0, num);
//   const good =
//     trimmedString &&
//     trimmedString.slice(
//       0,
//       Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
//     );
//   return good && str.length > num ? good.slice(0, num) + "..." : str;
// }

export const formatNums = new Intl.NumberFormat("en-US", {
  currency: "USD",
  minimumFractionDigits: 0,
});

export const isEmpty = (arr: unknown) => Array.isArray(arr) && !arr.length;
