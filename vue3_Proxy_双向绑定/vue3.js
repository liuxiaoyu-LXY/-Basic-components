let targetMap = new WeakMap();
var activeEffect;

function track(target,key){
    let depsMap = targetMap.get(target);
    if (!depsMap){
targetMap.set(target,(depsMap=new Map()))
    }
    let dep = depsMap.get(key)
    if(!dep){
        depsMap.set(key,(dep=new Set()))
    }
    // if(!dep.has(activeEffect)){
        dep.add(activeEffect);
        // console.log(dep)
    // }
}

function trigger(target,key){
    let depsMap = targetMap.get(target);
    if(!depsMap){return false}
    const effects = new Set()
    depsMap.get(key).forEach((e)=>{
        effects.add(e)
    })
    effects.forEach((e)=>{
        e()
    })

}

function reactive(target){
    return new Proxy(target,{
        get(target,key){
            track(target,key)
            return Reflect.get(target,key)
        },
        set(target,key,newval){
       Reflect.set(target,key,newval)
       trigger(target,key)
       return true
        } 
    }) 
}

function effect(fn){
    const _effect = (...args)=>{
        return fn(...args)
    }
    activeEffect = _effect
    return _effect
}
// const fn = (a)=>{
//     console.log('ss',a)
// }
// const fn2 = ()=>{
//     console.log(obj.age)
//     fn(2)
// }

// obj = reactive({name:'zhang',age:19})
// effect(fn2)
// fn2()
// obj.age = 3
// obj.age = 5


const App = {
    $data:null,
    setup(){
        let obj = reactive({name:'zhang',age:19})
        var obtn = document.getElementById('but')
        obtn.addEventListener('click',()=>{
            obj.age+=1
        })
        return {obj}
    },
    render(){
        return `<h3>${this.$data.obj.age}</h3>`
    }
}

function mount(app,el){
    app.$data = app.setup();
    effect(()=>{
        update(el,app)
    })
    update(el,app)
}


var odiv = document.getElementById('root')
function update(el,app){
    el.innerHTML = app.render()
    }
mount(App,odiv)

// obj = {a:1,b:2}
// pro = new Proxy(obj,{
//     get(target,key){
//         console.log('get',target,key)
//         return target[key]
//     },
//     set(target,key,newval){
//         console.log('set',key,newval)
//         target[key] = newval
//     }
// })

// console.log(pro.a)
// pro.b = 3
// console.log(pro.b,obj.b)
// function a(...args){
//     console.log(args)
//     console.log(...args)
// }
// a(1,2,3)
