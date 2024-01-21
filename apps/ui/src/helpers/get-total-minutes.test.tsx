import { DateTime } from "luxon";
import { expect, it } from "vitest";

import { getTotalMinutes } from "./get-total-minutes";

const sut = getTotalMinutes;

const partial = {
  id: "",
  userId: "",
  location: "",
};

it.each([
  {
    timeIn: DateTime.now().minus({ hours: 6 }),
    timeOut: DateTime.now(),
    lunchInMinutes: 30,
  },
  {
    timeIn: DateTime.now().minus({ hours: 5.5 }),
    timeOut: DateTime.now(),
    lunchInMinutes: 0,
  },
  {
    timeIn: DateTime.now().minus({ hours: 6.5 }),
    timeOut: DateTime.now(),
    lunchInMinutes: 60,
  },
])("should return correct number of minutes worked", (input) => {
  expect(sut({ ...partial, ...input })).to.equal(330);
});
