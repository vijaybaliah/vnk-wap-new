import superagent from 'superagent';
import config from './config';

const formatUrl = (path) => {
  if (path[0] === 'h') {
    console.log('Path: ' + path);
    return path;
  }
  let adjustedPath = path[0] !== '/' ? '/' + path : path;
  adjustedPath = adjustedPath.replace(/\/+/g, '/');
  let formattedUrl = adjustedPath;
  // if (__DEVELOPMENT__) {
    formattedUrl = config.apiHost + adjustedPath;
  // } else if (__SERVER__) {
  //   formattedUrl = config.bePrivateHost + adjustedPath;
  // }
  console.log('formatted Path: ' + formattedUrl);
  return formattedUrl;
}

const fetch = (url, options = {}) => new Promise((resolve, reject) => {
  const { method = 'get', data } = options;
  console.log('method: ', method);
  const request = superagent[method](formatUrl(url))

  if (data) {
    request.send(data);
  }

  request.withCredentials();

  request.end((err, { body } = {}) => {
    if (err) {
      return reject(body || err)
    } else {
      return resolve(body)
    }
  })
});

export default fetch;
