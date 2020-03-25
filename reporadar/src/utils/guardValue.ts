export function guardValue<P>(property: P | undefined): P {
  if (property === undefined) {
    console.log("property is undefined");
    throw new Error("Value not present!");
  }

  return property;
}
