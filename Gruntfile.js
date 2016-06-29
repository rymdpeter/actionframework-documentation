module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-compile-handlebars');
  var marked = require('marked');


  grunt.initConfig({
    "compile-handlebars":{
      dist: {
        files: [{
          src: 'index.handlebars',
          dest: 'dist/index.html'
        }],
        templateData: "tmp/data.json"
      }
    }
  });

  grunt.registerTask('compile', 'Bake the whole thing', function() {
    var styles = "";
    var scripts = "";
    var sections = {};
	var assets = {};
	
	grunt.file.recurse ("assets", function(path, root, sub, filename)  {
	
		assets[path] = new Buffer(grunt.file.read(path, {encoding: null})).toString("base64");
		
	});

    grunt.file.recurse("docs", function(path, root, sub, filename){
      if(sub) {
        var content = grunt.file.read(path);
        var name = path.replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, '').replace(" ","-");
        var title = filename.substring(0,filename.lastIndexOf("."));
        var fileType = filename.substring(filename.lastIndexOf("."));
		var assets = {};
        
        if(fileType == ".md") {
          content = marked(content);
        }
		
		
		
        var item = {
          content: content,
          name: name,
          title: title
        }
        if(!sections[sub]) {
          sections[sub] = [item];
        } else {
          sections[sub].push(item);
        }
      }
    });

    grunt.file.recurse("styles", function(path) {
      if(path.substring(path.lastIndexOf(".")) == ".css") {
        styles += grunt.file.read(path);
      }
    });

    grunt.file.recurse("scripts", function(path) {
      if(path.substring(path.lastIndexOf(".")) == ".js") {
        scripts += grunt.file.read(path);
      }
    });

    grunt.file.write("dist/index.html", ""); //clear previous version
    grunt.file.write("tmp/data.json", JSON.stringify({sections: sections, styles: styles, scripts: scripts, assets: assets})); //store

    grunt.task.run("compile-handlebars");
  });
};
