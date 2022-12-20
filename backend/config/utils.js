module.exports = { 
    wordCntToTime: (cnt) => {
        const timeArr = ('' + cnt/200).split('.')
        let min = 1*timeArr[0]
        if (timeArr[1]) {
            const sec = ('.' + timeArr[1])*.60
            min = sec > .3 ? min+1 : min
        }
        min = min > 0 ? min : 1
        return min
    }
}