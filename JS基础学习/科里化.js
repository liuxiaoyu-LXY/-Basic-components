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


