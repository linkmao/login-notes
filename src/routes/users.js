const express = require('express')
const { ConnectionStates } = require('mongoose')
const passport = require('passport')
const router = express.Router()
const User = require('../models/User')




router.get('/signin', (req, res) => {
    res.render('users/signin')
})

router.post('/signin',passport.authenticate('local',{
    successRedirect:'/notes',
    failureRedirect:'/users/signin',
    failureFlash:true
}))

router.get('/signup', (req, res) => {
    res.render('users/signup')
})

router.post('/signup', async (req, res) => {
    const { name, email, password, confirm_password } = req.body
    const errors = []
    if (name == "") {
        errors.push('El nombre debe tener caracteres')
    }
    if (password != confirm_password) {
        errors.push('Las contraseñas no coinciden')
    }
    if (password.length < 4) {
        errors.push('La contraseña debe ser mayor de cuatro caracteres')
    }

    // ESTE TRATAMIENTO DE ERRORES LO DEBO CORREGIR PARA QUE FUNCIONE ADECUADAMENTE
    if (errors.length > 0) {
        res.render('users/signup', { errors, name, email, password, confirm_password })
    }


    const emailUser = await User.findOne({ email: email })
    if (emailUser) {
        req.flash('mensajeError', 'El email ya está en uso')
        res.render('users/signup')
    }

    const newUser = new User({ name, email, password })
    newUser.password = await newUser.encryptPassword(password)
    await newUser.save()
    console.log(newUser)
    // req.flash('mensajeOk', "Usuario guardado")

    console.log(req.body)
    res.redirect('/users/signin')

}
)

router.get('/logout',(req,res)=>{
    req.logout()
    res.redirect('/')
})

module.exports = router