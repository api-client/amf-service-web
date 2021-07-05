import generator from '../tasks/prepare-models.mjs';

generator('./demo/apis.json')
.then(() => console.log('Models created'))
.catch((cause) => console.error(cause));
