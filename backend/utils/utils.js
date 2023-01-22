module.exports = { 
    wordCount: (str) => {
        const match = str.match(/[^\s]+/g)
        return match ? match.length : 0
    },

    wordCntToTime: (cnt) => {
        const timeArr = ('' + cnt/200).split('.')
        let min = 1 * timeArr[0]
        if (timeArr[1]) {
            const sec = ('.' + timeArr[1]) * .60
            min = sec > .3 ? min + 1 : min
        }
        return min > 0 ? min : 1
    },

    formatTitle: (str, id) => {
        return str.replace(/-|\||%|\/|\?|:|\\|\.|,+/g, ' ')
            .replace(/ +/g, '-')
            .replace(/-$/, '')
            .toLowerCase() + (id ? '-' + id : '')
    }
}