import { expect, it } from "vitest";

import { minutesToHours } from "./minutes-to-hours";

const sut = minutesToHours;

type InputType = {
  in: number;
  out: string | undefined;
};

const inputArray: InputType[] = [
  {
    in: 360,
    out: "6 hours, 0 minutes",
  },
  {
    in: 50,
    out: "0 hours, 50 minutes",
  },
  {
    in: 0.5,
    out: "0 hours, 0.5 minutes",
  },
  {
    in: 0,
    out: "0 hours, 0 minutes",
  },
];

it.each(
  inputArray,
)(
  "should return correct number of minutes worked",
  (input: InputType): void => {
    expect(sut(input.in)).to.equal(input.out);
  }
);
