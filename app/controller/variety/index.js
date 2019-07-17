'use strict';

const Controller = require('egg').Controller;

class IndexController extends Controller {
  async varietyCategory() {
    const { ctx } = this;
    const lists = await ctx.service.variety.index.varietyCategory();
    //处理返回的结果
    let res = {};
    if(Array.isArray(lists) && lists.length>0){
       for(let item of lists){
          if(item['key']!=='sort'){
             if(!res[item['key']]){
                res[item['key']]=[];
                res[item['key']].push(item)

             }
             else{
              res[item['key']].push(item)
             }
          }
       }
    }
    ctx.body = {
      code: 200,
      msg: 'success',
      data: res
    };
  }

  async varietyItem() {
    const { ctx } = this;
    //console.log(ctx.request.body)
    let data = ctx.request.body;
    if(!data.page){
      data.page = 1;
    }
    if(!data.size){
      data.size = 30;
    }
    data.offset = (data.page-1) * data.size;
    const lists = await ctx.service.variety.index.varietyItem(data);
    ctx.body = {
      code: 200,
      msg: 'success',
      data: lists
    };
  }

  async varietyList() {
    const { ctx } = this;
    //console.log(ctx.request.body)
    let data = ctx.request.body;
    if(!data.id) {
        ctx.body = {
          code: 201,
          msg: '参数缺失'
        };
    }
    else {
      const list = await ctx.service.variety.index.varietyList(data);
      ctx.body = {
        code: 200,
        msg: 'success',
        data: list
      };
    }
    
    
  }


}

module.exports = IndexController;