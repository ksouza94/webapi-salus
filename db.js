const mongoClient = require("mongodb").MongoClient

mongoClient.connect('mongodb://localhost/salus')
    .then(conn => global.conn = conn.db("salus"))
    .catch(err => console.log(err))


function findMedicamentos(callback) {
    global.conn.collection('salus').find().toArray(callback)
}

const ObjectId = require("mongodb").ObjectId
function findMedicamento(id, callback) {
    global.conn.collection('salus').findOne(new ObjectId(id), callback)

}
function insertMedicamento(medicamento, callback) {
    global.conn.collection('salus').insert(medicamento, callback)
}

function updateMedicamento(id, medicamento, callback) {
    global.conn.collection('salus').update({ _id: new ObjectId(id) }, medicamento, callback)
}

function patchMedicamento(id, updates, callback) {
    global.conn.collection('salus').update({ _id: new ObjectId(id) }, { $set: updates }, callback)
}

function deleteMedicamento(id, callback) {
    global.conn.collection('salus').deleteOne({ _id: new ObjectId(id) }, callback)
}

module.exports = { findMedicamentos, findMedicamento, insertMedicamento, updateMedicamento, patchMedicamento, deleteMedicamento }


