const fs = require('fs')
const { PATH } = require('../config/constants')

module.exports = { 
    removePostDirByName: (name) => {
        const path = PATH.Images + 'posts/' + name

        try {
            if (fs.existsSync(path)) {
                fs.rmSync(path, { recursive: true, force: true })
            }
        } catch (err) {
            console.log(err)
        }
    }
}