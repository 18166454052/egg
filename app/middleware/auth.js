module.exports = (options, app) => {
    return async function init(ctx, next) {
        const url  = ctx.request.url;
        if(url == '/registe' || url == '/login'){// 不验证身份
            await next();
        }
        else{
            const header = ctx.request.header;
            const name = header["name"]
            const token = header["token"]
            if(!name || !token || !name.trim() || !token.trim()){
                ctx.body={
                    code:403,
                    msg:'token失效'
                }
            }
            else{
                // 存在  要验证有效性
                const res =await ctx.service.user.index.findUser({name:name,token:token})
                if(!res){ // token 失效
                    ctx.body={
                        code:403,
                        msg:'token失效'
                    }
                }
                else{
                    //是不是 vip
                    await next();
                    // 如果不是VIP  是不是在免费时间内
                }
               
            }
           
        }
        
        // var userinfo = ctx.service.cookies.get('userinfo');

        // if (userinfo && userinfo._id && userinfo.phone) {
        //     //判断数据库里面有没有当前用户                
        //     var userResutl = await ctx.model.User.find({ "_id": userinfo._id, "phone": userinfo.phone });

        //     if (userResutl && userResutl.length > 0) {
        //         //注意
        //         await next();

        //     } else {
        //         ctx.redirect('/login');
        //     }
        // } else {

        //     ctx.redirect('/login');
        // }
        // const url  = ctx.request.url;
        // if(url == '/favicon.ico'){
        //     await next();
        // }
        // else{
        //     console.log("------开始验证用户登录--------")
        //     await next();
        // }
       
        

    };
};