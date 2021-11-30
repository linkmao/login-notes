const  helpers ={}

helpers.isAuth=(req,res, next)=>{
    if(req.isAuthenticated()){
        return next()
    }
    req.flash('mensajeError','No autorizado')
    res.redirect('/users/signin')

}

module.exports = helpers
