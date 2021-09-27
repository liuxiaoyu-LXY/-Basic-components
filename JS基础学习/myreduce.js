
Array.prototype.myreduce = function(cb,initialValue){
    let prev = initialValue;
    for (let item of this){
        prev = cb(prev,item)
    }
    return prev
    
}
let arr = [[1,2,3,4],[2,3,4,5]]
let arr1 = arr.myreduce(function(prev,cur){
    
    return prev.concat(cur)
},[])
console.log(arr1)

let arr2 = [[1,2,3,4],[2,3,4,5],[[2,3],[3,[3,4]]]]
let arrcopy = Array.from(arr2)
arr2[1][2] = 3
console.log(arr2)
console.log('cc',arrcopy,arrcopy===arr2)
let func = (arr)=>{
    return arr.myreduce(function(prev,cur){
        if(!Array.isArray(cur)){
            // prev.push(cur)
            return prev.concat([cur])
        }
        else{
            return prev.concat(func(cur))
        }
    
    },[])
}
let arr4 = func(arr2)
console.log(arr4)

let arr9 = [1,2,3]
let arr10 = arr9.myreduce((prev,cur)=>{
   return prev.concat([cur])

},[])
console.log(arr10)
