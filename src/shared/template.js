import serialize from "serialize-javascript";

export default (markup, data, fileObject) => {
  return `<!DOCTYPE html>
  <html>
    <head>
      <title>Vnk</title>
      <script src=${fileObject['main.js']} defer></script>
      <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
    </head>
    <body>
      <div id="app">
        ${markup}
      </div>
    </body>
  </html>`
}
