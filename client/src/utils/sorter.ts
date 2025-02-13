export const sorterDates = (a: Hotel, b: Hotel) => {
  if (!a.available_date_start || !b.available_date_start) return 0;
  return (
    new Date(a.available_date_start).getTime() -
    new Date(b.available_date_start).getTime()
  );
};

export const sorterLocaleCompare = (a: Hotel, b: Hotel) => {
  return a.address_name.localeCompare(b.address_name);
};
