import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import * as r from "rethinkdb"

const app = express()

app.use(cors())
app.use(bodyParser())

const connPromise = r.connect({
    db: "todo"
})

var conn;

connPromise.then(_conn => {
    conn = _conn
}).catch(err => {
    console.error(err)

    process.exit(1)
})

app.put("/todo/:id", async (req, res, next) => {
    try {
        // @TODO: schema validation
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
            data: await todoList.toArray()
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