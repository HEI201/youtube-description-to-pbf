let btn = document.querySelector("#btn")
let btn_clear = document.querySelector("#clear")
let text_input = document.querySelector("#content")
let copy_result = document.querySelector("#copy_result")
let result = document.querySelector("#result")
let one_step = document.querySelector("#one_step")
btn.addEventListener("click", (evt) => {
  let time_info_regx = /[()\s]*(?<time>\d{1,2}:\d{1,2}(:\d{1,2})*)[()\s]*(?<desc>.*\n)/g
  let input = text_input.value
  if (/\n$/) {
    input = input + "\n"
  }

  let iter = input.matchAll(time_info_regx)
  input = []
  for (const iterator of iter) {
    input.push([iterator.groups.time, iterator.groups.desc])
  }

  var bookmark = "[Bookmark]\n"
  input.forEach((e, i) => {
    console.log("🚀 ~ file: main.js ~ line 22 ~ input.forEach ~ e", e);
    let timearr = e[0].split(":")
    let info = e[1].replace("\n", "")
    let h = parseInt(timearr[0])
    let m = parseInt(timearr[1])
    let s = parseInt(timearr[2])
    let t = h * 60 * 60 + m * 60 + s
    let book = i + "=" + t + "000" + "*" + info + "*" + "\n"
    bookmark += book
  })
  result.value = bookmark
})
btn_clear.addEventListener("click", (evt) => {
  text_input.value = ""
})
copy_result.addEventListener("click", (evt) => {
  if (!result.value) {
  } else {
    btn.click()
  }
  navigator.clipboard.writeText(result.value).then(
    function () {
      /* success */
      console.log("copy scuccess ✔✔✔✔✔")
    },
    function (e) {
      console.warn("copy fail ❌❌")
      console.log(e)
      /* failure */
    }
  )
})
one_step.addEventListener("click", (evt) => {
  text_input.value = ""
  ;(async () => {
    const text = await navigator.clipboard.readText()
    text_input.value = text
    btn.click()
    copy_result.click()
  })()

  // navigator.clipboard.readText().then(function (e) {

  // }, function (e) {
  //     console.log('one step failed')
  // })
})
