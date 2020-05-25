const Controller = require('egg').Controller;
const  axios = require('axios')
const  jsonpAdapter = require('axios-jsonp');
class IndexController extends Controller {
 
  async jx() {
    let __callback = function txplayerJsonpCallBack_getinfo_591513(val){
      console.log('-----------------')
      console.log(val)
      return val
    }
    const { ctx } = this;
    axios({
      url:'http://h5vv.video.qq.com/getkey',
      params:{
        "br": 125315.14,
        "ct": 21600,
        "filename": "y00221a60w7.p401.mp4",
        "key": "AE6DC4B022C2A29C59D1A8E942787A2A54F64A5ABFCA7C99B51BD6539703D4F745DD2D77C3433ACAF1961BBFB6D84C1C717D23BEDCAF4DABC0D8BA2229F6C3464F59F0A10C5ED4CC25E355D9171DC65D411D6834BCA2DECD",
        "keyid": "y00221a60w7.10401.4",
        "level": 0,
        "levelvalid": 1,
        "s": "o",
        "sp": 0,
        "sr": 0
      },
      // adapter: jsonpAdapter,
      // callbackParamName: __callback
    }).then(function(res){
      let reg= /.*\(.*\).*/g
      let re = 'cccc({aa:123})'.match(reg)
      console.log(res[0])
    })
    
  
  
    ctx.body = {
      code: 200,
      msg: 'success',
      data: ''
    };
  }

 

}

module.exports = IndexController;