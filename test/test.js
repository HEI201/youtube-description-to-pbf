let str = `5:18) Edmonds Karp Algorithm | Source Code
⌨️ (6:10:08) Capacity Scaling | Network Flow
⌨️ (6:19:34) Capacity Scaling | Network Flow | Source Code
⌨️ (6:25:04) Dinic's Algorithm | Network Flow
⌨️ (6:36:09) Dinic's Algorithm | Network Flow | Source Code

--

Learn to code for free and get a developer job: https://www.freecodecamp.org`

let time_info_regx = /[()\s]*(\d{1,2}:\d{1,2}:\d{1,2})[()\s]*(.*\n)/g
let iter = str.matchAll(time_info_regx)
let input = []
for (const iterator of iter) {
    input.push([iterator[1], iterator[2]])
}


var bookmark = '[Bookmark]\n'
input.forEach((e, i) => {
    let timearr = e[0].split(':');
    let info = e[1].replace('\n', '')
    let h = parseInt(timearr[0])
    let m = parseInt(timearr[1])
    let s = parseInt(timearr[2])
    let t = h * 60 * 60 + m * 60 + s;
    let book = i + '=' + t + '000' + '*' + info + '*' + '\n'
    bookmark += book;
})
console.log(bookmark)