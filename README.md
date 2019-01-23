Install rethinkdb and create db & tables using:

```
node dbSetup.js
```

Run backend:
```
NODE_PORT=3000 npm start
```

Run frontend dev site:
```
SERVER_URL=http://localhost:3000 NODE_PORT=8000 npm start
```

Done:

[v] UI to create todo and mark as done
[v] Rest api to get todo list
[v] Rest api to insert/update todo
[v] Sync ui state to backend