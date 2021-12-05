const fs = require('fs');

// 使用前替换处理路径
// let vidDir = "//192.168.123.15/26956693/video/youtube"
let vidDir = "//192.168.1.15/26956693/我的视频/教程/youtube"

let readDir = fs.readdirSync(vidDir);
let defileArr = readDir.filter(filename => {
    let deReg = /.description$/
    return deReg.test(filename)
})
defileArr.forEach(e => {
    let data = fs.readFileSync(vidDir + '/' + e, 'utf-8');
    // console.log(data)

    // \r\n 读取文件的字符串，文本换行带这两个，而不只是带\n，与单纯传字符串不同
    let time_info_regx = /[()\s]*(\d{1,2}:\d{1,2}:\d{1,2})[()\s]*(.*\r\n)/g
    let input = data;
    if (/\n$/) {
        input = input + '\r\n'
    }

    let iter = input.matchAll(time_info_regx)
    let strArr = []
    for (const iterator of iter) {
        strArr.push([iterator[1], iterator[2]])
    }


    var bookmark = '[Bookmark]\n'
    strArr.forEach((e, i) => {
        let timearr = e[0].split(':');
        let info = e[1].replace(/\r\n/g, '')
        let h = parseInt(timearr[0])
        let m = parseInt(timearr[1])
        let s = parseInt(timearr[2])
        let t = h * 60 * 60 + m * 60 + s;
        let book = i + '=' + t + '000' + '*' + info + '*' + '\n'
        bookmark += book;
    })
    // console.log(bookmark)
    let fi = e.replace('.description', '.pbf')
    fi = vidDir + '/' + fi;
    console.log(fi)
    try {
        // 文件是否存在
        fs.accessSync(fi)
    } catch (e) {
        console.log('write')
        // 如果不存在则写文件
        fs.writeFileSync(fi, bookmark, 'utf-8')
    }
})