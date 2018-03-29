const websiteApp = require('./website/app')({});
const app = require('express')();

app.use(websiteApp);

app.listen(3000, () => console.log('Express server listening on port 3000'));
