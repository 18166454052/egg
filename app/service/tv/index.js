'use strict';


const Service = require('egg').Service;
class IndexService extends Service {
  async tvCategory() {
    const list = await this.app.mysql.query('select * from tv_category where disabled = 0');
    return list;
  }

  async tvItem(info) {
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
      query = `SELECT * FROM tv_item ORDER BY offset,id  LIMIT ${info.offset},${info.size}`
     }
     else{
       where = where.split(" ").slice(0,-1).join(' ');
       query = `SELECT * FROM tv_item  where ${where}  ORDER BY offset,id  LIMIT ${info.offset},${info.size}`
     }
    const result = await this.app.mysql.query(query)
    return result;
  }

  async tvList(info) {
    const list = await this.app.mysql.query(`select * from tv_list where parent_id = ${info.id}`);
    return list;
  }

}
module.exports = IndexService;
