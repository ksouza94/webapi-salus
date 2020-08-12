global.db = require('./db') //conexao com o db
const express = require('express') //cria o objeto da nossa aplicacao
const app = express()
const bodyParser = require('body-parser')
const port = 3000

app.use(bodyParser.urlencoded({ extend: true })) //visa a serialização e desserialização correta do body de requisicoes http usando o x-www-form-urlendoed
app.use(bodyParser.json())


//configurando o roteamento das requisicoes:

const router = express.Router()
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }))
app.use('/', router) /// get default que apenas retorna um json afirmando que a API funcionou

app.listen(port)
console.log('API funcionando!')

router.get('/medicamentos', (req, res) =>
    global.db.findMedicamentos((err, docs) => {
        if (err) res.status(500).json(err)
        else res.json(docs)
    }))

router.get('/medicamentos/:id', (req, res) =>
    global.db.findMedicamento(req.params.id, (err, doc) => {
        if (err) res.status(500).json(err)
        else res.json(doc)
    }))

//POST
router.post('/medicamentos', (req, res) => {
    const medicamento = req.body
    global.db.insertMedicamento(medicamento, (err, result) => {
        if (err) res.status(500).json(err)
        else res.json({ message: 'Medicamento cadastrado com sucesso!' })
    })
})

//PUT

router.put('/medicamentos/:id', (req, res) => {
    const id = req.params.id
    const medicamento = req.body
    global.db.updateMedicamento(id, medicamento, (err, result) => {
        if (err) res.status(500).json(err)
        else res.json({ message: 'Medicamento atualizado com sucesso!' })
    })
})

//PATCH

router.patch('/medicamentos/:id', (req, res) => {
    const id = req.params.id
    const updates = req.body
    global.db.patchMedicamento(id, updates, (err, result) => {
        if (err) res.status(500).json(err)
        else res.json({
            message: 'Medicamento atualizado com sucesso!'
        })
    })
})

//DELETE

router.delete('/medicamentos/:id', (req, res) => {
    const id = req.params.id
    global.db.deleteMedicamento(id, (err, result) => {
        if (err) res.status(500).json(err)
        else res.json({
            message: 'Medicamento excluído com sucesso!'
        })
    })
})