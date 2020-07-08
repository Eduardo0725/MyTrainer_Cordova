class FormattingDate
{
    date = new Date();

    dateFormat()
    {
        return {
            dayMonthYear: {
                day: this.date.getDate(),
                month: this.date.getMonth() + 1,
                year: this.date.getFullYear()
            },
            hourMinuteSecond: {
                hour: this.date.getHours(),
                minute: this.date.getMinutes(),
                second: this.date.getSeconds()
            }
        };
    }

    dateFormatURN(){
        const format = this.dateFormat();
        return `day=${format.dayMonthYear.day}&month=${format.dayMonthYear.month}&year=${format.dayMonthYear.year}&hour=${format.hourMinuteSecond.hour}&minute=${format.hourMinuteSecond.minute}&second=${format.hourMinuteSecond.second}`;
    }
}

try{
    module.exports = new FormattingDate();
} catch (e){
    //
}