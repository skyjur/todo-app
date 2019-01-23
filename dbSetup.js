const r = require("rethinkdb")

r.connect({}).then(conn => {
    r.dbCreate("todo").run(conn).then(() => {
        r.db("todo").tableCreate("todo")
    })
})

