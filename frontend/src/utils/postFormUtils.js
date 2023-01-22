import { IMGPATH } from "../constants/constants"


export const stringToTags = (str) => {
    const tags = str.toLowerCase().split(/\s?[, ]\s?/)
    return tags.filter(n => n)
}

export const dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

export const imgFileToBase64 = (file, cb) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
        cb(reader.result)
    }
    reader.onerror = function (error) {
      console.log('Error: ', error)
    }
}

export const parseImgFromHTML = (str, postsName) => {
    const imageList = []
    const imageNames = []
    let newStr = ''

    const subStr = str.split('src="')

    newStr += subStr[0]

    for (let i = 1; i < subStr.length; i++) {
        const before = subStr[i].slice(0, subStr[i].indexOf('"'))
        const after = subStr[i].slice(subStr[i].indexOf('"') + 1)
        const name = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.jpg'

        imageList.push(before)
        imageNames.push(name)

        newStr += 'src="' + IMGPATH.Images + 'posts/' + postsName + '/' + name 
            + '"' + after
    }

    return ({
        str: newStr,
        imageList,
        imageNames
    })
}