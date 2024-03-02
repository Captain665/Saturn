
export function FormatedDateWithWeek(date) {
    if (date) {
        const [day, month, year] = date?.split('-');

        const validFormatDateString = `${year}-${month}-${day}`;

        const original_date = new Date(validFormatDateString)

        return original_date.toLocaleDateString('en-GB', {
            weekday: 'short',
            day: 'numeric',
            month: 'short'
        })
    }else{
        return null;
    }

}

export function FormatedDate(date) {

    const newDate = new Date(date)

    return newDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long'
    })
}

export function FormatedTime(time) {

    const [hours, minutes] = time.split(':');

    const newDate = new Date();
    newDate.setHours(hours);
    newDate.setMinutes(minutes);

    return newDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });

}

export function FormatedDateWithYear(date){

    const newDate = new Date(date)

    return newDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year : 'numeric'
    })
}