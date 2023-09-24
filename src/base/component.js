Turtle.component("smtdfc-tool-navbar", async function($) {
  return ` 
   <nav class="navbar  " id="main-navbar">  
     <div class="navbar-brand">
       <h3>${$.getAttribute("group")}</h3>
     </div>
     <div class="navbar-contents" style="height:100%;">
        <button class="m-3 navbar-btn navbar-toggle-btn material-symbols-outlined" data-toggle="navbar" data-navbar="#main-navbar" >close</button>
        <ul class="navbar-menu">
          <li><a href="#/">List</a></li>
          <li><a href="https://smtdfc.github.io/#/help/report">Report</a></li>
          <li><a href="https://smtdfc.github.io/#/help/contact">Contact</a></li>
        </ul>
     </div>
     <button class="mr-4 navbar-btn navbar-toggle-btn material-symbols-outlined" data-toggle="navbar" data-navbar="#main-navbar" style="font-size:30px;" >menu</button>
   </nav>

  `
})

Turtle.component("smtdfc-tool-page", function($) {
  let data = await getInfoFile($.getAttribute("group"))
  $.addItem = function(info, source) {
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
      window.location = `${window.location.origin}/${window.location.pathname}?time=${Date.now()}&key=${generateKey("_")+generateKey()+generateKey()+generateKey()}&tool=${info.key}`
    })

    $.refs.list.appendChild(div)
  }
  
  $.onRender = function(){
    data.tools.forEach(t=>$.addItem(t))
  }

  return `
    <smtdfc-tool-navbar group="${data.info.name}"></smtdfc-tool-navbar>
    <br><br><br><br>
    <div class="fade main-container"  ${Turtle.ref("list")}></div>
  `
})

async function loadTool(name) {
  let ct = await import(`../tools/${name}/main.js`)
  await loadToolResource(ct.requirements)
  await ct.init()
  return {}
}

let tool = getParameterByName("tool")
if (!tool) {
  document.body.appendChild(document.createElement("smtdfc-tool-page"))
}else{
  loadTool(tool)
}