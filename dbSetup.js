const r = require("rethinkdb")

r.connect({}).then(async conn => {
    await r.dbCreate("todo").run(conn).then(() => {
        console.log('db was created')
    }).catch(error => {
        console.error(error.message)
    })

    await r.db("todo").tableCreate("todo").run(conn).then(error => {
        console.log('table was created')
    }).catch(error => {
        console.error(error.message)
    })

    conn.close()
})

