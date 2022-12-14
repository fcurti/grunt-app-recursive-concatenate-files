# grunt-app-recursive-concatenate-files

> Use [Grunt](http://gruntjs.com) to build and uglify a main file [index.js] with several file(s) on folder(s).

## System requirements

<img align="right" height="260" src="http://gruntjs.com/img/grunt-logo-no-wordmark.svg">

*Make sure you've [installed npm](https://docs.npmjs.com/cli/v8/commands/npm-install) before installing Grunt.*

*Make sure you've [installed grunt](http://gruntjs.com/getting-started) before trying out.*

# Download repo, install and run

*Download*

git clone https://github.com/fcurti/grunt-app-recursive-concatenate-files.git

*Intall packages*

Run `npm install`

*Run grunt in several ways as defined in Gruntfile*

Run `grunt --verbose --debug --stack` to try it out.

Run `grunt compose --verbose --debug --stack` to run compose task only.

Run `grunt uglify --verbose --debug --stack` to run uglify task only.

Run `grunt --path=b --path=a/a1 --verbose --debug --stack` to run Grunt considering only specific path(s).

Run `grunt clean` to remove the build directory.

Run `grunt checkjs -d --verbose` to jshint on *.min.js files.


Everything is explained in the [Gruntfile](Gruntfile.js).

## Contribute

Happy to accept additional examples :)

## License

ISC
