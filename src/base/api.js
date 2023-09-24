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
