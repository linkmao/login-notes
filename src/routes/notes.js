const express = require('express')
const router = express.Router()
const note= require('../models/Note')
const {isAuth}= require('../helpers/auth')


router.get('/add',isAuth, (req,res)=>{
res.render('notes/add-notes')
})

router.post('/new-note', isAuth,async (req,res)=>{
    const {title, description} = (req.body)
    const errors =[]
    console.log(title, description)
    if(!title){
        errors.push("Por favor escribe un titulo")
    } 
    if (!description){
        errors.push('Escribe una descripcion')
    }
    if (errors.length>0){
        res.render('notes/add-notes',{errors, title,description})
    }else
    {
    const newNote= new note({title, description})
    newNote.user= req.user.id // este dato lo tiene passport como variable global
    await newNote.save()
    req.flash('mensajeOk', "Nota agregada satisfactoriamente") 
    res.redirect('/notes')
    }
    })



router.get('/',isAuth, async (req,res)=>{
const notes= await note.find({user: req.user.id}).sort({date:'desc'}).lean()
console.log(notes)
res.render('notes/all-notes',{notes})
})


router.get('/edit/:id', isAuth, async (req,res)=>{
     const noteEditing= await note.findById(req.params.id).lean()
     res.render('notes/edit-note.hbs',{noteEditing})
    
})

router.put('/edit-note/:id',isAuth, async (req,res)=>{
    const {title, description}= req.body
    await note.findByIdAndUpdate(req.params.id, {title, description})
    req.flash('mensajeOk', "Nota edidata y guardada")
    res.redirect('/notes')
})


router.delete('/delete/:id', isAuth, async(req, res )=>{
await note.findByIdAndDelete(req.params.id)
req.flash('mensajeOk', "Nota elimindada satisfactoriamente")
res.redirect('/notes')
})
module.exports = router