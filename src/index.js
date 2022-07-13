const fs = require("fs")

// 使用前替换处理路径
let descriptionFilesDir = "D:/Downloads"
// let descriptionFilesDir = "//192.168.1.15/26956693/我的视频/教程/youtube"

let fileNameList = fs.readdirSync(descriptionFilesDir)
let descfileNameArr = fileNameList.filter((filename) => {
  let deReg = /.description$/
  return deReg.test(filename)
})
descfileNameArr.forEach((descFileName) => {
  let fileContent = fs.readFileSync(descriptionFilesDir + "/" + descFileName, "utf-8")
  // \r\n 读取文件的字符串，文本换行带这两个，而不只是带\n，与单纯传字符串不同
  let time_info_regular_express =
    /[()\s]*(?<time>\d{1,2}:\d{1,2}(:\d{1,2})*)[()\s]*(?<desc>.*)/g
  let linesContent = fileContent.split("\r\n")

  let bookmarkTimeInfoList = []
  linesContent.forEach((line) => {
    let iter = line.matchAll(time_info_regular_express)
    for (const iterator of iter) {
      bookmarkTimeInfoList.push([iterator.groups.time, iterator.groups.desc])
    }
  })

  var bookmark = "[Bookmark]\n"
  bookmarkTimeInfoList.forEach((timeInfo, index) => {
    let timearr = timeInfo[0].split(":")
    let info = timeInfo[1].replace(/\r\n/g, "")
    let t = ''
    if (timearr.length === 3) {
      let h = parseInt(timearr[0])
      let m = parseInt(timearr[1])
      let s = parseInt(timearr[2])
      t = h * 60 * 60 + m * 60 + s
    } else if (timearr.length === 2) {
      let m = parseInt(timearr[0])
      let s = parseInt(timearr[1])
      t = m * 60 + s
    } else if (timearr.length === 1) {
      let s = parseInt(timearr[0])
      t = s
    }
    let book = index + "=" + t + "000" + "*" + info + "*" + "\n"
    bookmark += book
  })
  let bookmarkFileName = descFileName.replace(".description", ".pbf")
  
   = descriptionFilesDir + "/" + bookmarkFileName
  console.log("🚀 ~ file: gen_potplayer_bookmark.js ~ line 50 ~ descfileNameArr.forEach ~ bookmarkFileName", bookmarkFileName);
  try {
    // 文件是否存在
    fs.accessSync(bookmarkFileName)
  } catch (e) {
    // 如果不存在则写文件
    fs.writeFileSync(bookmarkFileName, bookmark, "utf-8")
  }
})
