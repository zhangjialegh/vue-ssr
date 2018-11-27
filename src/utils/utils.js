

import {STORAGE_KEY} from '@/scenes/login/modules'
import * as global_ from '@/global'

export const formatNewsDate = timestampInSec => {
  var postDate = new Date(timestampInSec * 1000);
  var today = new Date().getDate();

  var offsetDays = parseInt(
    (new Date().getTime() - timestampInSec * 1000) / 86400000
  );

  var month = postDate.getMonth() + 1;
  var day = postDate.getDate();
  var result, offset;
  offset = Math.abs(today - day);
  if (offsetDays < 3) {
    if (offsetDays === 0) {
      result = "今天";
    } else if (offsetDays === 1) {
      result = "昨天";
    } else if (offsetDays === 2) {
      result = "2天前";
    }
  } else {
    result = month + "月" + day + "日";
  }

  return result;
};

export const formatMYDate = timestampInSec => {
  var postDate = new Date(timestampInSec * 1000);
  var year = postDate.getFullYear();
  var month = postDate.getMonth() + 1;
  return month + "月" + year;
};

export const formatHouseDate = timestampInSec => {
  var postDate = new Date(timestampInSec * 1000);
  var year = postDate.getFullYear();
  var month = postDate.getMonth() + 1;
  var day = postDate.getDate();

  return year + "-" + month + "-" + day;
};

export const formatInDate = timestampInSec => {
  var postDate = new Date(timestampInSec * 1000);
  var year = postDate.getFullYear();
  var month = postDate.getMonth() + 1;
  var day = postDate.getDate();

  return year + "/" + month + "/" + day;
};

export const formatFullDate = timestampInSec => {
  var postDate = new Date(timestampInSec * 1000);
  var year = postDate.getFullYear();
  var month = postDate.getMonth() + 1;
  var day = postDate.getDate();
  var hour = postDate.getHours();
  var min = postDate.getMinutes();
  var sec = postDate.getSeconds();

  return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
};

export const formatValidDate = timestampInSec => {
  var postDate = new Date(timestampInSec * 1000);
  var year = postDate.getFullYear();
  var month =
    postDate.getMonth() + 1 > 9
      ? postDate.getMonth() + 1
      : "0" + (postDate.getMonth() + 1);
  var day =
    postDate.getDate() > 9 ? postDate.getDate() : "0" + postDate.getDate();

  return year + "." + month + "." + day;
};

export const toThousandSep = value => {
  return value ? Number.parseFloat(value).toLocaleString("en-US") : "0";
};

export const toThousandFix = (num, dot = 2) => {
  num = Number.parseFloat(Math.abs(num)).toFixed(dot);
  var str = num.toString();
  //n为小数部分
  var n = str.slice(str.lastIndexOf("."));
  if (n.indexOf(".") == -1) {
    n = "";
  }
  //str为整数部分
  var str = parseInt(num).toString();
  var list = str.split("").reverse();
  for (var i = 0; i < list.length; i++) {
    if (i % 4 == 3) {
      list.splice(i, 0, ",");
    }
  }
  return list.reverse().join("") + n;
  // return value ? Number.parseFloat(Number(value).toFixed(2)).toLocaleString('en-US') : "0"
};

export const toThousandPrt = value => {
  return value ? (value * 100).toFixed(2) : "0";
};

export const uuid = () => {
  const tmSp = localStorage.getItem("vip-timestamp");
  if (tmSp) {
    return tmSp;
  } else {
    const s = [];
    const hexDigits =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 62), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
    const tmSp = s.join("");
    localStorage.setItem("vip-timestamp", tmSp);
    return tmSp;
  }
};

export const platForm = () => {
  return window.navigator.userAgent;
};

export const is_weixin = (ua) => {
  if(!ua) return false
  ua = ua.toLowerCase()
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  } else {
    return false;
  }
};

export const getAuthorization = (self) => {
  const cookieKey = self.state.base.cookies[STORAGE_KEY]
  const storeKey = self.state.auth.auth.acsToken
  const lng = self.state.base.locale
  return {
    Authorization: cookieKey || storeKey,
    lng: lng
  }
}

export const getStore = (router) => {
   return router.app.$store || router.app.$options.store
}

export const h5_weixin = (params,ua) => {
  const hostname = params
  if (hostname.indexOf('wehome.io') > -1 || hostname === 'localhost' || hostname === '47.91.242.96' || (hostname ===
      'h5.fangpinduo.com' && is_weixin(ua))) {
    return true
  } else {
    return false
  }
}

export const checkLocale = (cookies, locale) => {
  const cookieLng = cookies['lng']
  const browserLng = locale['language']
  if(cookieLng) {
    return cookieLng
  } else if(browserLng) {
    if(browserLng.toLowerCase().indexOf('zh') !== -1) {
      return global_['ZH_CN']
    } else {
      return global_['EN_US']
    }
  } else {
    return global_['ZH_CN']
  }
}

export const detectmob = (ua) => {
  if(!ua) return false
  if (
    ua.match(/Android/i) ||
    ua.match(/webOS/i) ||
    ua.match(/iPhone/i) ||
    ua.match(/iPad/i) ||
    ua.match(/iPod/i) ||
    ua.match(/BlackBerry/i) ||
    ua.match(/Windows Phone/i)
  ) {
    return true;
  } else {
    return false;
  }
};

export const getSearchCode = (uri, ua) => {
  let wechatCode = {};
  if(typeof window !== 'undefined') {
    let search = decodeURIComponent(uri)
  if (search.indexOf("code=") != -1) {
    wechatCode["code"] = search.match(/\Wcode=(\S*?)&/)[1];
    if (search.indexOf("state=") != -1) {
      wechatCode["state"] = search
        .match(/\Wstate=(\w)+/gi)[0]
        .split("=")[1];
    }
    if (is_weixin(ua)) {
      wechatCode["login_source"] = "mp";
    } else {
      wechatCode["login_source"] = "web";
    }
  }
  return JSON.stringify(wechatCode) === "{}" ? null : wechatCode;
  }
};

/* 获取元素到顶部的绝对距离 */
export const getElementTop = element => {
  var actualTop = element.offsetTop;
  var current = element.offsetParent;
  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }
  return actualTop;
};

export const base64Encode = str => {
  // 编码，配合encodeURIComponent使用
  var c1, c2, c3;
  var base64EncodeChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var i = 0,
    len = str.length,
    strin = "";
  while (i < len) {
    c1 = str.charCodeAt(i++) & 0xff;
    if (i == len) {
      strin += base64EncodeChars.charAt(c1 >> 2);
      strin += base64EncodeChars.charAt((c1 & 0x3) << 4);
      strin += "==";
      break;
    }
    c2 = str.charCodeAt(i++);
    if (i == len) {
      strin += base64EncodeChars.charAt(c1 >> 2);
      strin += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
      strin += base64EncodeChars.charAt((c2 & 0xf) << 2);
      strin += "=";
      break;
    }
    c3 = str.charCodeAt(i++);
    strin += base64EncodeChars.charAt(c1 >> 2);
    strin += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
    strin += base64EncodeChars.charAt(((c2 & 0xf) << 2) | ((c3 & 0xc0) >> 6));
    strin += base64EncodeChars.charAt(c3 & 0x3f);
  }
  return strin;
};

export const getQueryString = (search, name) => {
  if (search.indexOf(name) == -1) {
    return false;
  } else {
    let searchArr = search.split("&");
    const nameWrapper = searchArr.filter(item => {
      return item.indexOf(name + "=") != -1;
    })[0];
    const res = nameWrapper.slice(nameWrapper.indexOf("=") + 1);
    return res ? res : false;
  }
};


export const checkRefCode = (path) => {
  const refCode = localStorage.getItem('ref_code')
  const fullPath = decodeURIComponent(path.fullPath)
  const urlCode = fullPath.match(/\Wrf=(\S*?)(&|$)/) ? fullPath.match(/\Wrf=(\S*?)(&|$)/)[1] : false
  const selfCode = localStorage.getItem('self_code')
  if(urlCode) {
    if(refCode) {
      if(selfCode) {
        localStorage.setItem('ref_code', selfCode)
        return true
      } else {
        localStorage.setItem('ref_code', refCode)
        return true
      }
    } else {
      localStorage.setItem('ref_code', urlCode)
      return true
    } 
  } else {
    if(refCode) {
      return false
    } else if(selfCode) {
      localStorage.setItem('ref_code', selfCode)
      return false
    } else {
      return true
    }
  }
}

export const addRefCode = (path) => {
  const refCode = localStorage.getItem('ref_code')
  const selfCode = localStorage.getItem('self_code')
  const queryArr = Object.keys(path.query)
  let newQuery = ''
  if (queryArr.length > 0) {
    for (let index = 0; index < queryArr.length; index++) {
      const element = queryArr[index];
      if(index==0) {
        newQuery += '?'+ element +'=' + path.query[element]
      } else {
        newQuery += '&'+ element +'=' + path.query[element]
      }
    }
  }
  const code = selfCode ? selfCode : refCode
  if(newQuery === "") {
    return path.path + '?rf=' + code + path.hash
  } else {
    return path.path + newQuery +'&rf=' + code + path.hash
  }
}
