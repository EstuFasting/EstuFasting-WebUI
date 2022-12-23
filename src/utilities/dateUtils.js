export const getDayCountOfMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
};

export const weekdayIndex = (day, monthIndex, year) => {
    const res = new Date(year, new Date(year, monthIndex).getMonth(), day).getDay() - 1;
    if (res === -1) return 6;
    return res;
};

export const timestampToDateTimeLocal = (timestamp) => {
    return timestamp?.replace(" ", "T").substring(0, timestamp.length - 3);
};

export const isInThePast = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
}

export const getFirstDayOfThisWeek = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate() - weekdayIndex(now.getDate(), now.getMonth(), now.getFullYear()));
};

export const addDays = (date, days) => {
    return new Date(date.getTime() + (days * 24 * 60 * 60 * 1000));
};

export const dateToDateString = (date) => {
    return addDays(date, 1).toISOString().split("T")[0];
};