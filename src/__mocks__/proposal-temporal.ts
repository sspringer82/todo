let date = '2021-06-01T06:08:04.188083793';
export const setDate = (value: string) => {
  date = value;
};

export const Temporal = {
  now: {
    plainDateTimeISO() {
      return {
        toString: jest.fn().mockReturnValue(date)
      }
    }
  }
}
