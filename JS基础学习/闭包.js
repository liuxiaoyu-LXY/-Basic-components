const print = console.log
function makeClosures1(arr, fn) {
    const res = []
    for (var item of arr){
        
       (function(i){res.push(function(){
            return fn(i)
        })})(item)
        
        
    }
   
   return res
}
function makeClosures2(arr, fn) {
    let result = [];
    for(let i=0;i<arr.length;i++){
        result.push(function(){
            return fn(arr[i]);
        })
    }
    print(result)
    return result;
}
const a1= makeClosures1([1, 2, 3], function (x) { 
	return x * x; 
})
const b = makeClosures2([1, 2, 3], function (x) { 
	return x * x; 
})

print(a1[2]())
print(b[2]())
function abb(){
    console.log('sds')
}
const func = function(){
    let a = 10
    return function(){
        a+=2;
        print(a)

    }
}
var abb = function(){print('res')}
abb()

let b3 = func()
b3()
b3()

