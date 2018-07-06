// 构建一个1*1的图片，将需要传递的参数放在图片url上
(function (){
  var params = {};
  var clickParams = {};

  // pv流量部分
  if (document) {
    params.dm = document.domain || ''; // dm：当前页面domain
    params.ur = document.URL.substring(0, 500) || ''; // ur：当前页面url，超500长度截断
    params.ti = document.title || '';
    params.re = document.referrer.substring(0, 500) || ''; // re：上级页面url，超500长度截断
  }

  if (window && window.screen) {
    params.sc = window.screen.width + 'X' + window.screen.height;
    params.de = window.devicePixelRatio || 0;
  }

  if (navigator) {
    params.la = navigator.language || '';
    params.pl = navigator.platform || '';
    params.ap = navigator.appCodeName || '';
  }

  params.pu = new Date().getTime();
  var pv = concatUrl('', params);
  // console.log('pv', params, pv);
  // createImage('http://www.ludejun.cn:3000/log.gif?', pv);
  createImage('http://localhost:3000/log.gif?', pv);

  // 点击图片部分
  document.getElementById('ad-example').onclick = function (e) {
    clickParams.cu = new Date().getTime();
    clickParams.img = e.target.src.substring(0, 500); // img：图片来源url，超500长度截断
    clickParams.wh = e.target.clientWidth + 'X' + e.target.clientHeight;
    clickParams.ct = e.target.offsetLeft + ',' + e.target.offsetTop;
    clickParams.po = e.offsetX + ',' + e.offsetY;

    var clickEvent = concatUrl(pv, clickParams);
    // console.log('click', clickEvent);
    // createImage('http://www.ludejun.cn:3000/log.gif?', clickEvent);
    createImage('http://localhost:3000/log.gif?', clickEvent);
  }

  //拼接参数串
  function concatUrl(baseUrl, params) {
    for(var i in params) {
      if(baseUrl != '') {
        baseUrl += '&';
      }
      baseUrl += i + '=' + encodeURIComponent(params[i]);
    }
    return baseUrl;
  }

  // 生成图片发送请求
  function createImage(baseUrl, args) {
    //通过Image对象请求后端脚本
    var img = new Image(1, 1);
    img.src = baseUrl + args;
  }
})();
