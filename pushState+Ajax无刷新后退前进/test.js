
import {get2} from './api/getData.js'
let arr = location.pathname.split('/')
arr.pop()
let url = arr.join('/')
const oshow = document.getElementById('show')
const raw = location.pathname
function go(path){
    get2(`${url}/${path}`).then((data)=>{
    oshow.innerHTML = data
})  
    let state = new Object();
    state.path = path
    let saveurl = url+'/'+path.split('.')[0]
    console.log(location.pathname)
    history.pushState(state,null,saveurl)

}
go('a1.html')
go('a2.html')
go('a1.html')
go('a2.html')
window.addEventListener('popstate',function(e){
    e.preventDefault();
    console.log('ss')
    // this.location.href
    // go(e.state.path)
    // if(e.state){
        get2(`${url}/${e.state.path}`).then((data)=>{
            oshow.innerHTML = data
        })  
        // this.location.href = `${url}/test.html`

    // }
   
    console.log(e.state,location.pathname)

})
