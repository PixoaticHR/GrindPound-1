import moment from "moment";

const defaultFormat = 'YYYY-MM-DD'
export const DateFormatter = (date, format = defaultFormat) => {
    if (moment(date).isValid()) {
        return moment(date).format(format)
    } else {
        return '';
    }

}