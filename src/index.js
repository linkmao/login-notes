const express = require ('express')  // Importa libreria express para el manejo de rutas
const path = require ('path')     // es una dependencia de express, que permite la ubicacion de la ruta actual
const exphbs=require('express-handlebars')   // motor plantilla html, para la creación de html desde el backend
const methodOverride = require('method-override')  // permite ampliar los metodos PUT Y DELETE en los form
const session = require('express-session')    // manejador de inicio de sesion de usuarios
const passport = require('passport')      // es un complemento a express-session
const index = require('./routes/index.js')    // maneja la ruta principal y el about
const users= require('./routes/users.js')   // manejador de ruta de usuarios
const notes = require('./routes/notes.js')    // manejador de ruta de las notas
const flash=require('connect-flash')  // depedmencia que permite el envio de mensajes entre vistas


// Inicializaciones
const app= express()
require('./database.js')  // configura la inicializacion de la base de datos
require('./config/passport')    // Contiene toda la lógica del login

// Settings
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname,'views'))
app.set('public', path.join(__dirname,'public'))
app.engine('.hbs',exphbs({
    defaultLayout:'main.hbs',
    layoutsDir:path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname:'.hbs'    
}))
app.set('view engine', '.hbs')

//Midlewares
app.use(express.urlencoded({extended:false})) // es el que permite e envio de datos de formularios al backend exntend false es para que solo el envio sea de texto
app.use(methodOverride('_method'))  // permite ampliar al put y delete (que por defecto los formularios no lo tienen, para ello se usa un formulario oculto que estamos llamando _method
app.use(session({
    secret:'misecretomundial',
    resave: true,
    saveUninitialized:true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash()) // es un midleware que permite el envio de mensaje entre vistas

// Variables globales
app.use((req,res,next)=>{
    res.locals.mensajeOk=req.flash('mensajeOk')
    res.locals.mensajeError= req.flash('mensajeError')
    res.locals.error= req.flash('error')
    res.locals.user=req.user || null // guaraado de la variable global user que viene desde passport, cuando el usuario está logueado
    next()
})

// Routes
app.use('/', index)
app.use('/notes',notes)
app.use('/users',users)

// Files static
app.use(express.static(app.get('public')))

// Servidor escuchando
app.listen(app.get('port'),()=>{console.log('Servidor corriendo en puerto', app.get('port') )
})

