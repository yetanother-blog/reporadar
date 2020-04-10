import { sortByDay } from "./sortByDay";

describe("sortByDay", () => {
  it("should sort properly", () => {
    const entity1 = {
      id: 1,
      createdAt: "2020-02-15T06:00:00.000Z"
    };

    const entity2 = {
      id: 2,
      createdAt: "2020-02-15T01:00:00.000Z"
    };

    const entity3 = {
      id: 3,
      createdAt: "2020-03-10T11:54:00.000Z"
    };

    const entity4 = {
      id: 4,
      createdAt: "2020-01-02T20:08:00.000Z"
    };

    const rawData = [entity1, entity2, entity3, entity4];
    const sortedData = [
      {
        time: "2020-02-15T00:00:00.000Z",
        entities: [entity1, entity2]
      },
      {
        time: "2020-03-10T00:00:00.000Z",
        entities: [entity3]
      },
      {
        time: "2020-01-02T00:00:00.000Z",
        entities: [entity4]
      }
    ];

    expect(sortByDay(rawData, "createdAt")).toEqual(sortedData);
  });
});
