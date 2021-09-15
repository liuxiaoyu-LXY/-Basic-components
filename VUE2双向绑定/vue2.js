class Vue {
    constructor(options){
        this.$options = options;
        this.$data = options.data;
        this.observe(this.$data);
        this.$el = options.el;
    }

    observe(obj){
        
        if (!obj || typeof obj != 'object'){
            return
        }
        if (Object.prototype.toString.call(this)=='[object Object]'){
        // let dep = new Dep()

        obj.dep = new Dep()
        for (let key in obj){
            if (key == 'dep'){
                continue
            }
            let value = obj[key]
            let child = this.observe(value)
            let that  = this;
            Object.defineProperty(obj,key,{
                enumerable:true,
                configurable:true,
                writeable:true,
                get(){
                    console.log('visit',key)
                    if (Dep.target){
                        obj.dep.depend() 
                        // dep.addSub(Dep.target)
                        if (child){
                            child.dep.depend()
                        }   
                        console.log('depadd in get',obj.dep.id)
                    }
                    return value
                },
                set(newval){
                    console.log('set new value',key)
                    if (value === newval){
                        console.log('the same!')
                        return 
                    }
                    value = newval;
                    that.observe(value)
                    obj.dep.notify(); 
                }
            })
        }
    }
        return obj
    }
}
function Dep(){
    this.subs = []
    this.id = allid+1
    allid+=1
}
Dep.prototype.addSub = function addSub(sub){
    this.subs.push(sub);
    // console.log(this.subs,'add')
}
Dep.prototype.depend = function depend(){
    if(Dep.target){
        
    Dep.target.addDep(this)
    }
}
Dep.prototype.notify = function(){
    console.log('noti',this.subs,this.id)
    for(sub of this.subs){
        console.log('sds')
        sub.update();
    }
}
var allid = 0
Dep.target = null;


function Watcher(vm,fn,cb){
        this.vm = vm;
        this.fn = fn;
        this.cb = cb;
        this.deps = [];
        this.new=[];
        this.newid=[];
        this.depsid=[]
        this.val = null;
    }
Watcher.prototype.get =function get(){
    Dep.target = this;
    var val = this.fn.call(this.vm)
    // console.log(val)
    Dep.target = null;
    this.deps = this.new
    this.depsid = this.newid;
    this.new = []
    this.newid = []
    return val
}    
Watcher.prototype.addDep = function addDep(dep){
    this.new.push(dep)
    this.newid.push(dep.id)
    if (! this.depsid.includes(dep.id)){
        console.log('add',dep)
        dep.addSub(this);
    // this.deps.push(dep.id)

    }

    
}
Watcher.prototype.update = function update()
{console.log('u[')
    var val = this.get();
    console.log(val)
    if (this.val!== val){

        this.cb.call(this.vm)
    }
    
}

const el = document.getElementById('root');
// console.log(el)
const app = new Vue({
    el:el,
    data: {
        test: "i am test",
        foo: {
            bar: 1,
            cal:2
        }
    }
});
function fn(){
    return this.$data.foo
}

function cb(){

    this.$el.innerText = this.$data.foo.bar
    
    
}
const watcher = new Watcher(app,fn,cb)
watcher.get()
setTimeout(()=>{
    app.$data.foo.cal= 3;

},2000)
obtn = document.getElementById('but')
oin = document.getElementById('in')
obtn.addEventListener('click',()=>{
    app.$data.foo.bar +=3
})
oin.addEventListener('keydown',()=>{
    app.$data.foo.bar = oin.value
})

// console.log(app.$data.foo.bar)
// watcher.update()
// app.$data.test = "hello world!!";
// app.$data.foo.bar = {a:1};
// app.$data.foo.bar.a = 3;