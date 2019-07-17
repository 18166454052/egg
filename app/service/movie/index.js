'use strict';


const Service = require('egg').Service;
class IndexService extends Service {
  // 默认不需要提供构造函数。
  // constructor(ctx) {
  //   super(ctx); 如果需要在构造函数做一些处理，一定要有这句话，才能保证后面 `this.ctx`的使用。
  //   // 就可以直接通过 this.ctx 获取 ctx 了
  //   // 还可以直接通过 this.app 获取 app 了
  // }
  async movieCategory() {
    const list = await this.app.mysql.query('select * from movie_category');
    return list;
  }

  async movieItem(info) {
    const category = info.category;
    let where = '';
    let query = '';
    if (Object.keys(category).length > 0) {
      for(let cat in category) {
        if(category[cat]!=-1){
          where+=` ${cat} like '%${category[cat]}%' and` 
        }
      }
     }
     if(!where){
      query = `SELECT * FROM movie_item ORDER BY offset,id  LIMIT ${info.offset},${info.size}`
     }
     else{
       where = where.split(" ").slice(0,-1).join(' ');
       query = `SELECT * FROM movie_item  where ${where}  ORDER BY offset,id  LIMIT ${info.offset},${info.size}`
     }
    const result = await this.app.mysql.query(query)
    return result;
  }

  async itemSearch(info) {
    const list = await this.app.mysql.query(`select * from movie_item where movie_title like \'%${info.search}%\' ORDER BY offset,id  LIMIT ${info.offset},${info.size}`);
    return list;
  }

}
module.exports = IndexService;
