import {app} from '../api/index.js'
const server = app.listen(8080, () => {
  console.log('server listening on port 8080.')
}) 