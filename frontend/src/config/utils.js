module.exports = { 
    strToPathStr: (str) => {
        return str.replace(/-|\||\/|\?|:|\\|\.|,+/g, ' ')
            .replace(/ +/g, '-')
            .replace(/-$/, '')
            .toLowerCase()
    }
}