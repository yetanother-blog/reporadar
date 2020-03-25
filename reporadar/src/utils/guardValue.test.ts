import test from "ava";
import { guardValue } from "./guardValue";

test("guardValue should throw an error", async t => {
  t.throws(() => guardValue(undefined));
});

test("guardValue should return value ", async t => {
  t.is(guardValue("hello"), "hello");
});
