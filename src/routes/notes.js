const express = require('express')
const router = express.Router()
const note= require('../models/Note')


router.get('/add',(req,res)=>{
res.render('notes/add-notes')
})

router.post('/new-note',async (req,res)=>{
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
    await newNote.save()
    req.flash('mensajeOk', "Nota agregada satisfactoriamente") 
    res.redirect('/notes')
    }
    })



router.get('/', async (req,res)=>{
const notes= await note.find().sort({date:'desc'}).lean()
console.log(notes)
res.render('notes/all-notes',{notes})
})


router.get('/edit/:id', async (req,res)=>{
     const noteEditing= await note.findById(req.params.id).lean()
     res.render('notes/edit-note.hbs',{noteEditing})
    
})

router.put('/edit-note/:id', async (req,res)=>{
    const {title, description}= req.body
    await note.findByIdAndUpdate(req.params.id, {title, description})
    req.flash('mensajeOk', "Nota edidata y guardada")
    res.redirect('/notes')
})


router.delete('/delete/:id',async(req, res )=>{
await note.findByIdAndDelete(req.params.id)
req.flash('mensajeOk', "Nota elimindada satisfactoriamente")
res.redirect('/notes')
})
module.exports = router