export function getCurrentDate(dateInput) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let currentDate;

    if (dateInput instanceof Date) {
        currentDate = dateInput;
    } else if (typeof dateInput === 'string') {
        currentDate = new Date(dateInput);
    } else {
        currentDate = new Date();
    }

    const month = months[currentDate.getMonth()];
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    return `${month} ${day}, ${year}`;
};


export function calculateThreeDaysLater(inputDate) {
    const date = new Date(inputDate);
    date.setDate(date.getDate() + 3);
    const monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
}

const capitalizeWords = (text) => text.replace(/\b\w/g, function(char) {
    return char.toUpperCase();
});

export { capitalizeWords };