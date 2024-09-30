const jwt = require("jsonwebtoken");

const ensureAuthenticated = (req,res,next)=>{
    const auth = req.header("authorization");
    if(!auth){
      return  res.status(404).json({message:"unauthorized, jwt is required"})
    }
    try{
        const decoded =jwt.verify(auth,process.env.JWT_SECRET);
        req.user = decoded ;
        next();
      }catch(err){
        res.status(404).json({message:"unauthorized, jwt is wrong or expire"})
      }
}
module.exports = ensureAuthenticated;