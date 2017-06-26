# [legacy] Org Website


### Setup Development Environment

First let's install the dependencies of our project:

```
npm install
```

Next, let's install `nodemon` so you can have your changes being hot-reloaded without having to restart the server every time:

```
npm install -g nodemon
```

Then test it out!
```
npm run dev
```

### Setup `forever` for production

If you are deploying this into a new cloud server instance you will probably need to install `forever` globally.

`npm install -g forever`
> **NOTE**: you must have Node.js installed


Then, duplicate the file `forever/production.sample.json` and rename it to `forever/production.json`. Then set the following `keys` in the newly created `production.json` to match this one:

```json
{
    "uid": "org-website",
    "append": true,
    "watch": false,
    "script": "index.js",
    "sourceDir": "/example/path/here",
    "args": ["--port", "80"]
}
```

> **NOTE**: set `"sourceDir"` to match the folder where you've forked the `org-website` project (basically run `pwd` to get the folder location)
