
let p = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(2)
    },1000)
})
let p2 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject(3)
    },2000)
})
let p3 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject(2)
    },800)
})


Promise.prototype.myfinally = function(callback){
    return this.then((data)=>{
        callback()
        return data
    }).catch((err)=>{
        callback()
        return err
    })
}
// p.then((data)=>{
//     console.log('===',data)
// }).myfinally(()=>{
//     console.log('22233')
// })
Promise.myresolve = function(val){
    if(val instanceof Promise){
        // console.log(val)
        return val

    }
    else{
        
        return new Promise((resolve)=>{
            resolve(val)
        })
    }

}
// Promise.myresolve(2).then((data)=>{
//     console.log('2222',data)
// })

Promise.all = function(ps){
    let resolve
    let reject
    let promise = new Promise((res,rej)=>{
        resolve = res
        reject = rej

    })
    let fullfill = 0
    let n = ps.length
    let res = new Array(n).fill(0)
    function resolveone(ind){
        return function(val){
            fullfill+=1
            res[ind] = val
            if (fullfill >= n){
                resolve(res)

            }

        }

    }
    function rejectall(err){
        reject(err)

    }
    for (let [ind,p] of ps.entries()){
        // console.log(p,ind)
        p.then(resolveone(ind),rejectall)
    }
    return promise
}
Promise.race = function(ps){
    let resolve;
    let reject;
    let promise = new Promise((r,j)=>{
        resolve = r;
        reject = j;
    })
    for (let p of ps){
        p.then((data)=>{resolve(data)},(err)=>{reject(err)})
    }
    return promise
}
Promise.allsettled= function(ps){
    let reject;
    let resolve;
    let promise = new Promise((r,j)=>{
        reject = j;
        resolve = r;
    })
    let settled = 0;
    let allnum = ps.length
    let res = new Array(allnum).fill({});
    
    function judge(num){
        if (num >= allnum){
            return true
        }
        return false
    }

    function resolveone(ind){
        return (data)=>{
        settled +=1;
        let obj = {
            status:'fulfilled',
            value:data
        }
        res[ind] = (obj)
        if (judge(settled)){
            resolve(res)
        }
        
        }

    }
    function rejectone(ind){
        return (data)=>{
        settled +=1;
        let obj = {
            status:'rejected',
            reason:data
        }
        res[ind] = (obj)
        if (judge(settled)){
            resolve(res)
        }
    }

    }
    for (let [ind,p] of ps.entries()){
        p.then(resolveone(ind)).catch(rejectone(ind))
    }
    return promise
}

Promise.myany = function(ps){
    return new Promise((resolve,reject)=>{
        let allnum = 0;
        let n = ps.length
        function errorone(ind){
            return (err)=>{
                errors[ind] = err
                allnum+=1
                if (allnum>=n){
                    reject(new AggregateError(errors))
                }
            }
        }

        let errors = new Array(n).fill(0)

        for (let [ind,p] of ps.entries()){
            p.then((data)=>{resolve(data)}).catch(errorone(ind))

        }
    })
}
Promise.myany([p,p2,p3]).then((data)=>{console.log(data)}).catch((err)=>{
    console.log('e',err.errors)

})
