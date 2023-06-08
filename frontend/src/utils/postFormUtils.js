import { IMGPATH } from "../constants/constants"

export const stringToTags = (str) => {
    const tags = str.toLowerCase().split(/\s?[, ]\s?/)
    return tags.filter(n => n)
}

export const dataURLtoFile = (dataurl, filename) => {
    if (!dataurl) return
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
    while(n--){
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, {type:mime})
}

export const imgFileToBase64 = (file, cb) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
        cb(reader.result)
    }
    reader.onerror = (error) => {
      console.log('Error: ', error)
    }
}

export const fetchImageBlob = async (dataUrl, cb) => {
    if (!dataUrl || !cb) return

    try {
        const blob = await (await fetch(dataUrl)).blob()
        cb(blob)
        
    } catch (err) {
        console.log(err)
    }
}

export const parseImgFromHTML = (str, postsName) => {
    if (!str || ! postsName) return ({
        str: '',
        imageList: [],
        imageNames: []
    })

    const imageList = []
    const imageNames = []
    let newStr = ''

    const subStr = str.split('src="blob:')

    newStr += subStr[0]

    for (let i = 1; i < subStr.length; i++) {
        const before = subStr[i].slice(0, subStr[i].indexOf('"'))
        const after = subStr[i].slice(subStr[i].indexOf('"') + 1)
        const name = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.jpg'

        imageList.push(before)
        imageNames.push(name)

        newStr += 'src="blob:' + IMGPATH.IMAGES  +  name 
            + '"' + after
    }

    return ({
        str: newStr,
        imageList,
        imageNames
    })
}
/*
export const asyncParseImgFromHTML = (str, postsName, cb) => {
    if (!str || !postsName || ! cb) return ({
        str: '',
        imageList: [],
        imageNames: []
    })

    const imageList = []
    const imageNames = []
    let newStr = ''

    const subStr = str.split('src="')

    newStr += subStr[0]

    for (let i = 1; i < subStr.length; i++) {
        const before = subStr[i].slice(0, subStr[i].indexOf('"'))
        const after = subStr[i].slice(subStr[i].indexOf('"') + 1)
        const name = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.jpg'

        imageNames[i-1] = name
            
        newStr += 'src="' + IMGPATH.IMAGES + name 
            + '"' + after

        if (/^http(s)?:\/\//.test(before)) {
            fetchImageBlob(before, (blob) => {
                imgFileToBase64(blob, (image) => { 
                    imageList[i-1] = image
                })
            }) 
        } else {
            imageList[i-1] = before
        }
    }

    cb ({
        str: newStr,
        imageList,
        imageNames
    })
}*/