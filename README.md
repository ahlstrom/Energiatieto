Energiatieto
============


**Running**

You need [node.js](http://nodejs.org/) and [npm](https://npmjs.org/) (comes with node). After cloning the repo, install all the dependencies:

```
npm install
```

And then run the application with:

```
node src/web
```

This will start the app in *development* mode - running against unconcatenated and unminified source files. To emulate how heroku runs the application, you need [foreman](https://github.com/ddollar/foreman):

```
foreman start
```

Which will start the app in *production* mode.

**Building & testing**