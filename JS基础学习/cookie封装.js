const set = (name,value,{maxAge,domain,path,secure}={})=>{
    let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    if (typeof maxAge === 'number'){
        cookieText+=` ;max-age=${maxAge}`;

    }
    if(domain){
        cookieText+=` ;domain=${domain}`;
    }
    if(path){
        cookieText+=` ;path=${path}`;
    }
    if(secure){
        cookieText+=` ;sucure=`;
    }
    document.cookie = cookieText;

}

export {set}

const get = name =>{
    name =`${encodeURIComponent(name)}`;
    const cookies = document.cookie.split('; ');
    for (const item of cookies){
        const [cookieName,cookieVal] = item.split('=');
        if (cookieName === name){
            return decodeURIComponent(cookieVal);
        }
    }
    return -1; 
}
export{get}

//删除要参考name，domain，path
const remove = (name,{domain,path}={})=>{
    set(name,'',{domain,path,maxAge:-1});
  
};
export{remove}
