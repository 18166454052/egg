'use strict';


const Service = require('egg').Service;
class IndexService extends Service {
  
  async login(info) { // 更新token
    const res = await this.app.mysql.update("user",{token:info.token,free_end:info.free_end},{where:{name:info.name,pass:info.pass}});
    return res;
  }

  async registe(info) { // {user:'',pass:'','create_at'}
    const res = await this.app.mysql.insert("user",info);
    return res;
  }

  async checkUser(info) { // 判断用户名是不是已经被注册
    const res = await this.app.mysql.get("user",{name:info.name});
    return res;
  }

  async findUser(info) { // 根据条件查找用户
    // {name:'', pass:''}   验证用户名和密码
    // {token:'', name:""}   验证用户的有效性
    const res = await this.app.mysql.get("user",info);
    return res;
  }
}
module.exports = IndexService;
