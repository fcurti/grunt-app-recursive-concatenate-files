module.exports = function(grunt) {
		
	// Project configuration.
	grunt.initConfig({
	  
		config: grunt.file.readJSON('package.json'),

		compose: {
			  src: ["<%= config.src %>/index.js"],
			  pathConfigFiles:  "<%= config.pathConfigFiles %>",
			  dest: "<%= config.dest %>",
		},
		  
		uglify: {
		  options: {
			banner: "/*! <%= config.name %> <%= grunt.template.today('yyyy-mm-dd') %> <%= config.author %> */\n"
		  },
		  build: {
			files: [{
				  expand: true,
				  cwd: 'build',
				  src: ['**/*.js', '!**/*.min.js'],
				  dest: 'build',
				  rename: function (dst, src) {					
					return dst + '/' + src.replace('.js', '.min.js');
				  }
				}]
			  }
		},
		
		clean: ["build"]
				
	});

	// Load the uglify (minify, mangler) plugin module
	grunt.loadNpmTasks("grunt-contrib-uglify");

	// Load the jshint plugin module
	grunt.loadNpmTasks('grunt-contrib-jshint');
	
	// Load the clean plugin module
	grunt.loadNpmTasks('grunt-contrib-clean');

	// compose task file
	grunt.registerTask("compose", function () {
				
		var pathConfigFiles=grunt.config.get('compose.pathConfigFiles');
		var path=grunt.option("path") || pathConfigFiles;
		var aPath=[];
				
		grunt.log.writeln("compose :: path requested: "+path+ " type: "+grunt.util.kindOf(path));
				
		if (grunt.util.kindOf(path) === "string") {				
			aPath.push(path);
		}else
			aPath=path;
		
		aPath.forEach(function(p){
			
			if(p != pathConfigFiles)
				p = pathConfigFiles+p;
			
			
			grunt.log.writeln("compose :: manage path: "+p);
			
			grunt.file.recurse(p, fileWriter)
			
			grunt.log.writeln();
		});
		

	});
		
	// the grunt.file.recurse callback function	
	function fileWriter(abspath, rootdir, subdir, filename) {

		// take the last path in case subdir is undefined
		// compliant for use case: run only compose for a specific path(s):
		// 	runt compose --path=b --path=a/a1 --verbose --debug --stack		
		if(!subdir)
			subdir=rootdir.replace(grunt.config.get('compose.pathConfigFiles'),'');
			
		grunt.log.writeln("fileWriter :: abspath: "+abspath+" rootdir: "+rootdir+" subdir: "+subdir+" filename: "+filename);

		try{
			var src=grunt.config.get('compose.src');
			var dest=grunt.config.get('compose.dest')+ '/' + subdir + '/' + filename;
			
			grunt.log.writeln('fileWriter :: concatenating ' + src + ' with ' + abspath + ' as '+ dest);
			
			var result=grunt.file.read(src)+grunt.file.read(abspath);
			
			grunt.file.write(dest , result);
		}catch(e) {
			grunt.verbose.or.write(msg).error().error(e.message);
			grunt.fail.warn('Something went wrong.');
		}
	}
	
	/**
	 * run all default tasks (clean, compose, uglify, jshint):
	 * 	grunt --verbose --debug --stack
	 * 
	 * run only compose task: 
	 * 	grunt compose --verbose --debug --stack
	 * 
	 * run only uglify task: 
	 * 	grunt uglify --verbose --debug --stack
	 * 
	 * run only compose for a specific path(s): 
	 * 	grunt compose --path=b --path=a/a1 --verbose --debug --stack
	 * 
	 * run all default tasks, no write: 
	 * 	grunt --verbose --debug --stack --no-write
	 * 
	 * run clean task:
	 * 	grunt clean
	 * 
	 **/
	 
	grunt.registerTask('default', ['clean', 'compose', 'uglify']);	
	
};
