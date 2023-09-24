const base = "https://smtdfctools.github.io"
async function loadSource() {
  let response = await axios({
    url: `${base}/tools/sources.json`,
  })
  return response.data.sources
}

async function getInfoFile(group){
  let response = await axios({
    url: `${base}/${group}/info.json`,
  })
  return response.data
}

function createScriptTag(path){
  let script= document.querySelector("script")
  script.src = path
  document.body.appendChild(script)
}

async function loadToolResource(configs){
  let jsResources = configs.js
  jsResources.forEach(r=>createScriptTag(r))
  return {}
}