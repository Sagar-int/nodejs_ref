const ageDetector = (req, res, next)=>{
  
    if (req.query.age >= 18) {
        next()
    }else{
        res.send("You are under age, you can not access this website")
    }
}

module.exports = ageDetector