[![Build Status](https://travis-ci.org/aseemk/node-neo4j-template.svg?branch=master)](https://travis-ci.org/aseemk/node-neo4j-template)

# Node-Neo4j Template

This is a template [Node.js][] + [Neo4j][] app, using the
**[node-neo4j][]** library (available on npm as `neo4j`).

A demo is running on Heroku at **<https://node-neo4j-template.herokuapp.com/>**.

The app is a simple social network manager: it lets you add, remove, follow,
and unfollow users.
It's basic, and the UI is crappy, but hey, it's a template app. =)

So try it out, browse the code, and fork this project to get a head start on
coding your own app. Enjoy!


## Installation

```
git clone git@github.com:aseemk/node-neo4j-template.git
cd node-neo4j-template
npm install
```

You'll also need a local Neo4j 2.x instance.
Install it via **[neo4j.org/download](http://neo4j.org/download)**,
or if you're on a Mac, `brew install neo4j`.


## Usage

Start your local Neo4j instance (e.g. `neo4j start`), then:

```
npm start
```

The app will now be accessible at
[http://localhost:3000/](http://localhost:3000/).

To run the tests:

```
npm test
```


## Deploying

If you're deploying in another way, the code also checks for a `NEO4J_URL`
environment variable to support pointing to any other Neo4j database.
The value of this variable should be set to the database root URL, and it can
contain HTTP Basic Auth info. E.g. `https://user:pass@1.2.3.4:5678`.
You can alternately pass the auth portion (`user:pass`) as `NEO4J_AUTH`.

One thing to note is that `npm start` is currently geared towards development:
it runs [node-dev](https://github.com/fgnass/node-dev) instead of node.
Edit `scripts.start` in [package.json](./package.json) if you need to change that.


## Miscellany

- MIT license.


[Node.js]: http://nodejs.org/
[Neo4j]: http://www.neo4j.org/
[node-neo4j]: https://github.com/thingdom/node-neo4j

## TODO

- Security (frontend and API)
- Backup (neo4j database)
- Test/prod environment setup (docker)
- Continuous deployment (with tests)
