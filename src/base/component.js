Turtle.component("smtdfc-tool-navbar", async function($) {
  if($.getAttribute("load")=="true")
    $.setAttribute("group",(await getInfoFile($.getAttribute("group"))).info.name)

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

Turtle.component("smtdfc-tool-page", async function($) {
  let group = $.getAttribute("group")
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
      let url = new URL(window.location.href)
      url.searchParams.set("tool",info.key)
      window.location = url.href
    })

    $.refs.list.appendChild(div)
  }

  $.onRender = function() {
    data.tools.forEach(t => $.addItem(t))
  }

  return `
    <smtdfc-tool-navbar group="${data.info.name}"></smtdfc-tool-navbar>
    <br><br><br><br>
    <div class="fade main-container"  ${Turtle.ref("list")}></div>
  `
})

async function loadTool(repo, name) {
  // https://raw.githubusercontent.com/smtdfctools/Math-tools/master/tools/simplify_expr/main.js
  let ct = await import(`${base}/${repo}/master/tools/${name}/main.js`)
  await loadToolResource(ct.requirements.resources)
  await ct.init()
  return {}
}

function initPage(group) {
  let tool = getParameterByName("tool")
  if (!tool) {
    let page = document.createElement("smtdfc-tool-page")
    page.setAttribute("group", group)
    document.body.appendChild(page)
  }else{
    let navbar = document.createElement("smtdfc-tool-navbar")
    navbar.setAttribute("group", group)
    navbar.setAttribute("load","true")
    document.body.appendChild(navbar)
    loadTool(group,tool)
  }
}