import moment, { DurationInputArg1, DurationInputArg2 } from "moment";

export function stringToRelativeTime(
  value: string = ""
): [DurationInputArg1, DurationInputArg2] | undefined {
  const splittedValue = value.split(" ");

  if (!splittedValue[0] || !splittedValue[1]) {
    return undefined;
  }

  return [
    splittedValue[0] as DurationInputArg1,
    splittedValue[1] as DurationInputArg2,
  ];
}
