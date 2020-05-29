import express from 'express'
import App from '../shared/App'
import { renderToString } from "react-dom/server"
import React from 'react'
import fs from 'fs'
import path from 'path';
import apiClient from '../utils/apiClient';
import { fetchLayoutData } from '../utils/api';
import template from '../shared/template';
// import manifest from ''
// path for manifest json file
const manifestPath = `${process.cwd()}/public/manifest.json`

//read the manifest.json file
const app = express()

console.log('manifestPath: ', manifestPath);
app.use(express.static('public'));

app.get("*", (req, res, next) => {
  const fileObject = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
  apiClient(fetchLayoutData()).then((response) => {
    const data = response;
    const markup = renderToString(<App data={data} />)
    res.send(template(markup, data, fileObject))
  }).catch(error => {
    console.log('error: ', error);
  })
})

app.listen(3001, () => {
  console.log(`Server is listening on http://localhost:3001`)
})
