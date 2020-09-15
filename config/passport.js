const bcrypt=require('bcrypt');
const LocalStrategy=require('passport-local').Strategy;
const User =require('../models/user');

const init=(passport)=>{
   passport.use(new LocalStrategy(
      async function (username,password,done) {
         let user=await User.findOne({username}).lean()
         if(!user){
            return done(null,false,{message:'No user Found!'})
         }
         try {
            if(await bcrypt.compare(password,user.password)){
               return done(null,user)
            }else{
               return done(null,false,{message:'Password Incorrect'})
            }
         } catch (error) {
            return done(error)
         }
      }
   ))

   passport.serializeUser((user,done)=>done(null,user._id));
   passport.deserializeUser((id,done)=>done(null,async()=>{
      let user=await User.findById(id)
      return user
   }))
}

module.exports=init