const utils = require('./utils')

describe('wordCount()', () => {
    it('should return 5', async () => {
        const str = 'this should return five words'
        const cnt = utils.wordCount(str)
        expect(cnt).toEqual(5)
    })

    it('should return 0', async () => {
        const str = ''
        const cnt = utils.wordCount(str)
        expect(cnt).toEqual(0)
    })

    it('should return 50', async () => {
        const str = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + 
            "Nunc molestie ligula euismod metus dignissim placerat. Nam id " + 
            "justo pulvinar mi scelerisque sodales. Nunc pretium enim dolor, " +
            "eu posuere tortor congue eget. Fusce auctor erat eros, at fermentum " + 
            "libero tristique nec. Proin egestas libero nisi, nec molestie nisl " + 
            "fermentum molestie. Praesent."

        const cnt = utils.wordCount(str)
        expect(cnt).toEqual(50)
    })
})

describe('wordCntToTime', () => {
    it('200 cnt returns 1', async () => {
        const min = utils.wordCntToTime(200)
        expect(min).toEqual(1)
    })

    it('0 cnt returns 1', async () => {
        const min = utils.wordCntToTime(0)
        expect(min).toEqual(1)
    })

    it('720 cnt returns 4', async () => {
        const min = utils.wordCntToTime(720)
        expect(min).toEqual(4)
    })

    it('20000 cnt returns 100', async () => {
        const min = utils.wordCntToTime(20000)
        expect(min).toEqual(100)
    })
})