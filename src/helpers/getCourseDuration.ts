export const getCourseDuration = (duration: number) => {
    //     Duration (format: hh:mm + 'hours'). In the mockedCoursesList duration is specified in minutes;

    // info
    // If hh < 10 (0,1,2,3,4,5,6,7,8,9) => '0' + h:mm + 'hours' (02:20 hours)
    // If mm < 10 (0,1,2,3,4,5,6,7,8,9) => hh:'0' + m + 'hours' (10:06 hours)
    // If hh = 1 => hh:mm + 'hour' (01:30 hour)

    // example
    // 160 minutes => 02:40 hours
    // 210 minutes => 03:30 hours
    // 60 minutes => 01:00 hour
    // 90 minutes => 01:30 hour
    // 10 minutes => 00:10 hours
    // 5 minutes => 00:05 hours

    const hours = Math.floor(duration / 60)
    const minutes = duration % 60
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes} hours`
}