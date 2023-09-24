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

function generateKey(prefix = "_") {
  return `${prefix}${(Math.floor(Math.random()*1000000)*Date.now()).toString(16)}`
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

