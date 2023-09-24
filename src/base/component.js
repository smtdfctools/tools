Turtle.component("smtdfc-tool-navbar",async function($){
 let response = await getInfoFile($.getAttribute("group"))
  return `
   <nav class="navbar  " id="main-navbar">  
     <div class="navbar-brand">
       <h3>${response.data.info.name}</h3>
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