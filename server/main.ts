import express from "express"
import bodyParser from "body-parser"
import * as r from "rethinkdb"

const app = express()

app.use(bodyParser())

const connPromise = r.connect({
    db: "todo"
})

var conn;

connPromise.then(_conn => {
    conn = _conn
})

app.put("/todo/:id", async (req, res, next) => {
    try {
        const data = await r.table("todo")
            .insert({ ...req.body, id: req.params.id }, { conflict: "replace" })
            .run(conn)
        res.send({
            ok: true,
            data
        })
    } catch (e) {
        next(e)
    }
})

app.get("/todo", async (req, res, next) => {
    try {
        let todoList = await r.table("todo").run(conn)
        res.send({
            ok: true,
            data: todoList
        })
    } catch (e) {
        next(e)
    }
})

app.listen(parseInt(process.env.NODE_PORT || '3000'), (e) => {
    if (!e) {
        console.log('listening', process.env.NODE_PORT || '3000')
    } else {
        console.error(e)
    }
})