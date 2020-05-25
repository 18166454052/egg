/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1560608227009_6904';

  // add your middleware config here
  config.middleware = [
    'auth' // 用户登录验证
  ];

config.mysql={
  client: {
    host:  '127.0.0.1',//
    port: '3306',
    user: 'root',
    password: 'root',//
    database: 'movie',
  }
}
config.jwt = {
  secret: "vipplayerfreedomofwealth"    //自定义 token 的加密条件字符串
};
config.security = {
　　csrf: {
　　　　　　enable: false
　　　　},
　　　　domainWhiteList: [ '*' ]
　};
config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
};

// add your user config here
const userConfig = {
  // myAppName: 'egg',
  onerror: {
    all(err, ctx) {
      // 在此处定义针对所有响应类型的错误处理方法
      // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
      const status = ctx.status
      if(status === 404){
          ctx.body={
            code:404,
            msg:'请求的地址不存在'
          } 
      }
      else {
        ctx.body={
          code:500,
          msg:'服务器发生未知错误'
        } 
      }
    }
    
  },
};

return {
  ...config,
  ...userConfig,
  
};
};
