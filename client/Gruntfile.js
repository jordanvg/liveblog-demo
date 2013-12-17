module.exports = function (grunt) {

  grunt.initConfig({
    distdir: 'dist',
    pkg: grunt.file.readJSON('package.json'),
    src: {
      js: ['src/**/*.js'],
      html: ['src/index.html'],
      tpl: ['src/app/templates/*.html'],
      sass: ['src/sass/stylesheet.scss'],
      sassWatch: ['src/sass/**/*.scss']
    },
    clean: ['<%= distdir %>/*'],
    copy: {
      assets: {
        files: [
          { dest: '<%= distdir %>', src : '**', expand: true, cwd: 'src/assets/' }
        ]
      }
    },
    html2js: {
      app: {
        options: {
          base: 'src/app'
        },
        src: ['<%= src.tpl %>'],
        dest: '<%= distdir %>/templates/app.js'
      },
    },
    concat: {
      dist: {
        src:['<%= src.js %>'],
        dest:'<%= distdir %>/static/<%= pkg.name %>.js'
      },
      index: {
        src:['src/index.html'],
        dest: '<%= distdir %>/index.html',
        options: {
          process: true
        }
      },
      angular: {
        src:['vendor/angular/angular.js'],
        dest: '<%= distdir %>/static/angular.js'
      },
      bootstrap: {
        src:['vendor/bootstrap/js/transition.js',
              'vendor/bootstrap/js/alert.js',
              'vendor/bootstrap/js/button.js',
               'vendor/bootstrap/js/carousel.js',
               'vendor/bootstrap/js/collapse.js',
               'vendor/bootstrap/js/dropdown.js',
               'vendor/bootstrap/js/modal.js',
               'vendor/bootstrap/js/tooltip.js',
               'vendor/bootstrap/js/popover.js',
               'vendor/bootstrap/js/scrollspy.js',
               'vendor/bootstrap/js/tab.js',
               'vendor/bootstrap/js/affix.js'],
        dest: '<%= distdir %>/static/bootstrap.js'
      },
      jquery: {
        src:['vendor/jquery/*.js'],
        dest: '<%= distdir %>/static/jquery.js'
      }
    },
    uglify: {
      dist: {
        src:['<%= src.js %>'],
        dest:'<%= distdir %>/static/<%= pkg.name %>.js'
      },
      angular: {
        src:['<%= concat.angular.src %>'],
        dest: '<%= distdir %>/static/angular.js'
      },
      bootstrap: {
        src:['vendor/bootstrap/js/transition.js',
              'vendor/bootstrap/js/alert.js',
              'vendor/bootstrap/js/button.js',
               'vendor/bootstrap/js/carousel.js',
               'vendor/bootstrap/js/collapse.js',
               'vendor/bootstrap/js/dropdown.js',
               'vendor/bootstrap/js/modal.js',
               'vendor/bootstrap/js/tooltip.js',
               'vendor/bootstrap/js/popover.js',
               'vendor/bootstrap/js/scrollspy.js',
               'vendor/bootstrap/js/tab.js',
               'vendor/bootstrap/js/affix.js'],
        dest: '<%= distdir %>/static/bootstrap.js'
      },
      jquery: {
        src:['vendor/jquery/*.js'],
        dest: '<%= distdir %>/static/jquery.js'
      }
    },
    sass: {
      dist: {
        files: {
          '<%= distdir %>/static/<%= pkg.name %>.css': '<%= src.sass %>'
        }
      }
    },
    watch: {
      all: {
        files:['<%= src.js %>', '<%= src.sassWatch %>', '<%= src.tpl %>', '<%= src.html %>'],
        tasks:['default']
      },
      build: {
        files:['<%= src.js %>', '<%= src.sassWatch %>', '<%= src.tpl %>', '<%= src.html %>'],
        tasks:['build']
      }
    },
    jshint: {
      files:['Gruntfile.js', '<%= src.js %>'],
      options:{
        curly:true,
        eqeqeq:true,
        immed:true,
        latedef:true,
        newcap:true,
        noarg:true,
        sub:true,
        boss:true,
        eqnull:true,
        globals:{}
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-html2js');

  grunt.registerTask('default', ['jshint','build']);
  grunt.registerTask('build', ['clean','html2js','concat','sass','copy:assets']);
  grunt.registerTask('release', ['clean','html2js','uglify','jshint','concat:index', 'sass','copy:assets']);
  // grunt.registerTask('test-watch', ['karma:watch']);

};
