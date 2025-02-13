import DayjsFunc from "dayjs";

// 2gis doesnt have available dates, so mocking it as it always available
export const mockAvailableDates = (items: Hotel[]) => {
  return items.map((it) => {
    it.available_date_start = DayjsFunc()
      .add(Math.random() * 30, "day")
      .format("YYYY-MM-DD");
    it.available_date_end = DayjsFunc()
      .add(Math.random() * 30, "day")
      .add(2, "month")
      .format("YYYY-MM-DD");
    return it;
  });
};
