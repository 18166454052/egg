'use strict';

const Controller = require('egg').Controller;
const moment = require('moment');
const crypto = require('crypto');
const utils =require("../../utils/time")
class IndexController extends Controller {
 

  async login() {
    const { ctx, app } = this;
    //console.log(ctx.request.body)
    let data = ctx.request.body;
    data["pass"] = crypto.createHash('md5').update(data["pass"]).digest('hex');
    const user = await ctx.service.user.index.findUser({name:data.name,pass:data.pass});
    if(!user){// 不匹配
        ctx.body = {
          code: 201,
          msg: '用户名和密码不匹配'
        };
    }
    else{
      const token = app.jwt.sign({
          name: data.name,  //需要存储的 token 数据
          date:new Date()  // 保证每次用户登录生成不同的token
        //......
      }, app.config.jwt.secret);
     data['free_end'] = utils.getDate(3); //三天之后的现在  免费结束
      data.token = token
      const res = await ctx.service.user.index.login(data);
      ctx.body = {
          code: 200,
          msg: 'success',
          data:{token:token,name:data.name}
        };
    }
   
  }

  async registe() {
    const { ctx } = this;
    //console.log(ctx.request.body)
    let data = ctx.request.body;
    if(!data.name || !data.pass ||  !data.name.trim() || !data.pass.trim()){
        ctx.body = {
          code: 201,
          msg: '请填写完整用户名和密码'
        };
    }
    else{
       // 判断用户名是否已经存在
      let checkName = await ctx.service.user.index.checkUser(data);// null
      if(!checkName){// 不存在
          data['create_at'] = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
          data["pass"] = crypto.createHash('md5').update(data["pass"]).digest('hex');
          const res = await ctx.service.user.index.registe(data);
          ctx.body = {
            code: 200,
            msg: 'success',
            data: res
          };
      }
      else{ // 存在
        ctx.body = {
          code: 202,
          msg: '用户名已经存在',
        };
      }
     
    }
    
  }

 
}

module.exports = IndexController;