// import { SUCC_CODE, TIMEOUT } from './config';
import { getJSON,get } from './ajax/index.js';
const SUCC_CODE = 200;
const TIMEOUT = 30000;
// 获取数据
const getData = (url, options) => {

  const jsonp =  getJSON(url, {
    timeoutTime: TIMEOUT,
    ...options
  });
  // console.log('jsonp',jsonp)
  const datajson = 
    jsonp.then(response => {
  
      if (response.code !== SUCC_CODE)
        throw new Error(`出错了：${response.code},${response.msg}`);
        // console.log(this);
      // response.xhl = this.xhl;

      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
    datajson.xhr = jsonp.xhr
    return datajson;
};
const get2 = (url, options) => {

  const jsonp =  get(url, {
    timeoutTime: TIMEOUT,
    ...options
  });
  // console.log('jsonp',jsonp)
  const datajson = 
    jsonp.then(response => {
  
      // if (response.code !== SUCC_CODE)
      //   throw new Error(`出错了：${response.code},${response.msg}`);
      //   // console.log(this);
      // response.xhl = this.xhl;

      return response;
    })
    .catch(err => {
      console.log(err);
    });
    datajson.xhr = jsonp.xhr
    return datajson;
};
// 获取数据
const getData_multi = (url, options) => {

  const jsonp =  getJSON(url, {
    timeoutTime: TIMEOUT,
    ...options
  });
  // console.log('jsonp',jsonp)
  const datajson = 
    jsonp.then(response => {
  
      if (response.code !== SUCC_CODE)
        throw new Error(`出错了：${response.code},${response.msg}`);
        // console.log(this);
      // response.xhl = this.xhl;

      return response;
    })
    .catch(err => {
      console.log(err);
    });
    datajson.xhr = jsonp.xhr
    return datajson;
};

// 延时
const delay = ms => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

// 获取延迟的数据
const getDelayedData = (url, options) => {
  return delay(3000).then(() => {
    return getData(url, options);
  });
};

export { getData, getDelayedData,getData_multi,get2 };
