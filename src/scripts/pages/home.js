const base = "https://smtdfctools.github.io"
async function loadSource() {
  let response = await axios({
    url: `${base}/tools/sources.json`,
  })
  return response.data.sources
}

async function loadContent(source) {
  let response = await axios({
    url: `${base}/${source.repository}/info.json`,
  })
  return response.data.tools
}

Turtle.component("home-page", function($) {
  $.addItem = function(info,source) {
    let div = document.createElement("div")
    div.innerHTML = `
      <div class="tool-info mt-4 p-4 shadow d-flex align-items-center justify-content-sb">
        <div class="d-flex align-items-center">
          <span class="material-symbols-outlined">${info.icon ?? ""}</span>
          <h4 class="ml-1"> ${info.name} </h4>
        </div>
        <span class="material-symbols-outlined">arrow_right_alt</span>
      </div>
    `
    div.addEventListener("click", function() {
      window.location =`${base}/${source.repository}/index.html?time=${Date.now()}&key=${generateKey("_")+generateKey()+generateKey()+generateKey()}&tool=${info.key}`
    })
    
    $.refs.list.appendChild(div)
  }

  showLoader()
  $.onRender = function() {
    loadSource()
      .then((sources) => {
        sources.forEach((source) => {
          loadContent(source)
            .then(list => {
              list.forEach(item => {
                $.addItem(item,source)
              })
            })
        })
        hideLoader()
      })
      .catch((err) => {
        app.ui.addMsg("Cannot load content ", "error", 4000)
      })
      .finally(() => {

      })

  }

  return `
  <h1>List Tools </h1>
  <div class="" ${Turtle.ref("list")}></div>
  `
})