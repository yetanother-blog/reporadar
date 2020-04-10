import { sortByDay } from "./sortByDay";

describe("sortByDay", () => {
  it("should sort properly", () => {
    const entity1 = {
      id: 1,
      createdAt: new Date("2020-03-15 06:00").toISOString()
    };

    const entity2 = {
      id: 2,
      createdAt: new Date("2020-03-15 01:00").toISOString()
    };

    const entity3 = {
      id: 3,
      createdAt: new Date("2020-03-10 11:54").toISOString()
    };

    const entity4 = {
      id: 4,
      createdAt: new Date("2020-01-01 20:08").toISOString()
    };

    const rawData = [entity1, entity2, entity3, entity4];
    const sortedData = [
      {
        time: new Date("2020-03-15 00:00").toISOString(),
        entities: [entity1, entity2]
      },
      {
        time: new Date("2020-03-10 00:00").toISOString(),
        entities: [entity3]
      },
      {
        time: new Date("2020-01-01 00:00").toISOString(),
        entities: [entity4]
      }
    ];

    expect(sortByDay(rawData, "createdAt")).toEqual(sortedData);
  });
});
