const express = require ('express')
const path = require ('path')
const exphbs=require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const index = require('./routes/index.js')
const users= require('./routes/users.js')
const notes = require('./routes/notes.js')
const flash=require('connect-flash')  // depedmencia que permite el envio de mensajes entre vistas

// Inicializaciones
const app= express()
require('./database.js')

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
app.use(flash()) // es un midleware que permite el envio de mensaje entre vistas


// Variables globales
app.use((req,res,next)=>{
    res.locals.mensajeOk=req.flash('mensajeOk')
    res.locals.mensajeError= req.flash('mensajeError')
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

