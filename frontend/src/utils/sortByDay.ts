type Entity<D extends string, R> = { [E in D]: string } & R;

export function sortByDay<D extends string, R>(
  entities: Entity<D, R>[],
  dateField: D
) {
  return entities.reduce<{ time: string; entities: Entity<D, R>[] }[]>(
    (prev, curr) => {
      const time = new Date(curr[dateField]);
      time.setUTCHours(0, 0, 0, 0);

      const lastDay = prev[prev.length - 1];
      if (lastDay && lastDay.time === time.toISOString()) {
        lastDay.entities.push(curr);
      } else {
        prev.push({
          time: time.toISOString(),
          entities: [curr]
        });
      }

      return prev;
    },
    []
  );
}
