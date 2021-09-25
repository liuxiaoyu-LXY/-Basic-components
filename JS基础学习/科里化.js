//这个和科里化有所不同，它不规定参数数组大小，只有在print的时候才会进行计算，所以为它的tostring方法进行重写
function add(){
    var args = [...arguments];
    var fn=function(){
        args.push(...arguments);
        return fn
    }; 
    fn.toString=function(){ 
        return args.reduce(function (a, b) {
            return a + b;
        });
    };
    return fn
}
// alert(add(1)(1,2,3)(2))



// alert(add(1)(2)(3)  )              // 6
// print(add(1, 2, 3)(4)     )        // 10
// print(add(1)(2)(3)(4)(5)    )      // 15
// print(add(2, 6)(1)  )              // 9

//要求每次传入1个，所以使用arg，保证function。length==1
function curryIt(fn) {
    let args = []
    return function curried(arg){
        args.push(arg)
        if (args.length>=fn.length){
            return fn.apply(this,args)
        }
        else{
            return curried
        }
    }
}
    //不要求每次传入多少个
function curryIt2(fn) {
    let _args = []
    return function curried(...args){
        _args.push(...args)
        if (_args.length>=fn.length){
            return fn.apply(this,_args)
        }
        else{
            return curried
        }
    }
}
function fn(a,b,c){
    return a+b+c
}
console.log(curryIt2(fn)(1,2)(3))
console.log(curryIt2(fn)(1)(2)(3))

//手写bind
//1.实现上下文绑定
//2. 传入参数实现预传递参数

Function.prototype.mybind = function(...args){
    let context = args.shift()
    //使用args数组，避免了直接使用arguments需要用Array.prototype.slice.call进行操作，因为类数组无这些func
    let self = this
    return function(){
        self.apply(context,[...args,...arguments])
    }

}
function a(x,y,z){
    console.log(x+y+z+this.num)
}
let obj = {num:2}
let func = a.bind(obj,2)
func(3,3)
let func2 = a.mybind(obj,2)
func(3,4)
