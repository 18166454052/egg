'use strict';

const Controller = require('egg').Controller;

class IndexController extends Controller {
  async movieCategory() {
    const { ctx } = this;
    const lists = await ctx.service.movie.index.movieCategory();
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

  async movieItem() {
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
    const list = await ctx.service.movie.index.movieItem(data);
    ctx.body = {
      code: 200,
      msg: 'success',
      data: list
    };
  }

  async itemSearch() {
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
    if(!data.search.trim()){
      ctx.body = {
        code: 500,
        msg: '搜索参数为空'
      };
    }
    else{
        const list = await ctx.service.movie.index.itemSearch(data);
        ctx.body = {
          code: 200,
          msg: 'success',
          data: list
        };
    }
   
   
    
  }
}

module.exports = IndexController;