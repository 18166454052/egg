'use strict';

const Controller = require('egg').Controller;

class IndexController extends Controller {
  async tvCategory() {
    const { ctx } = this;
    const lists = await ctx.service.tv.index.tvCategory();
    //处理返回的结果
    let res = {};
    if(Array.isArray(lists) && lists.length>0){
       for(let item of lists){
          if(item['key1']!=='sort'){
             if(!res[item['key1']]){
                res[item['key1']]=[];
                res[item['key1']].push(item)

             }
             else{
              res[item['key1']].push(item)
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

  async tvItem() {
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
    const lists = await ctx.service.tv.index.tvItem(data);
    ctx.body = {
      code: 200,
      msg: 'success',
      data: lists
    };
  }

  async tvList() {
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
      const list = await ctx.service.tv.index.tvList(data);
      ctx.body = {
        code: 200,
        msg: 'success',
        data: list
      };
    }
    
    
  }


}

module.exports = IndexController;