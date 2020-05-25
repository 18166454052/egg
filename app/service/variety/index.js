'use strict';


const Service = require('egg').Service;
class IndexService extends Service {
  async varietyCategory() {
    const list = await this.app.mysql.query('select * from variety_category where disabled = 0');
    return list;
  }

  async varietyItem(info) {
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
      query = `SELECT * FROM variety_item ORDER BY year  desc,px  LIMIT ${info.offset},${info.size}`
     }
     else{
       where = where.split(" ").slice(0,-1).join(' ');
       query = `SELECT * FROM variety_item  where ${where}  ORDER BY year  desc,px  LIMIT ${info.offset},${info.size}`
     }
    const result = await this.app.mysql.query(query)
    return result;
  }

  async varietyList(info) {
    const list = await this.app.mysql.query(`select * from variety_list where parent_id = ${info.id}`);
    return list;
  }

}
module.exports = IndexService;
