import express from 'express'
import App from '../shared/App'
import { renderToString } from "react-dom/server"
import React from 'react'

const app = express()

app.use(express.static("public"))

app.get("*", (req, res, next) => {
  const markup = renderToString(<App />)
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vnk</title>
        <script src="/bundle.js" defer></script>
      </head>
      <body>
        <div id="app">
          ${markup}
        </div>
      </body>
    </html>
  `)
})

app.listen(3001, () => {
  console.log(`Server is listening on http://localhost:3001`)
})