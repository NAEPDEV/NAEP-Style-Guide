module.exports = function (grunt) {
  grunt.initConfig({
    documentjs: {
      versions: {
        '1.2.4': 'https://github.com/NAEPDEV/NAEP-Style-Guide',
      },
      versionDest: 'release/<%= version %>',
      defaultVersion: '1.2.4',
      defaultDest: 'release',
      siteDefaults: {
        static: 'styleguide-theme/static',
        templates: 'styleguide-theme/templates',
        version: '1.2.4',
      },
      sites: {
        id: {
          glob: 'id/**/*.{css,less,scss,md}',
          dest: 'docs/id',
          parent: 'id',
          templates: 'styleguide-theme/templates/id',
        },
        media: {
          glob: 'media/**/*.{css,less,scss,md}',
          dest: 'docs/media',
          parent: 'media',
        },
        ux: {
          glob: 'ux/**/*.{css,less,scss,md}',
          dest: 'docs/ux',
          parent: 'ux',
        },
      },
    },
    clean: {
      //  preBuild: ['build', 'node_modules/documentjs/site/templates'],
      preBuild: [
        'docs',
        'node_modules/documentjs/site/templates',
        'node_modules/documentjs/site/static/',
      ],
      preRelease: ['release'],
      postRelease: [
        'release/**/.gitignore',
        'release/**/.gitattributes',
        'release/**/gruntfile.js',
        'release/**/*.json',
        'release/**/*.md',
        'release/**/styleguide-theme',
        'release/**/ux/*.css',
      ],
    },
    concurrent: {
      target: {
        tasks: ['connect', 'watch'],
        options: {
          logConcurrentOutput: true,
        },
      },
    },
    connect: {
      server: {
        options: {
          port: 8080,
          base: '.',
          keepalive: true,
          open: 'http://localhost:8080/docs/index.html',
        },
      },
    },
    copy: {
      index: {
        expand: true,
        src: 'index.html',
        dest: 'docs',
      },
      versionLinking: {
        files: [
          {
            src: 'styleguide-theme/static/versionLinking.js',
            dest: 'docs/versionLinking.js',
          },
        ],
      },
      build: {
        expand: true,
        src: [
          'index.html',
          'ux/demos/**',
          'id/*.csv',
          'media/*.csv',
          'ux/*.csv',
        ],
        dest: 'docs',
      },
      versionConfig: {
        expand: true,
        src: ['versions.json'],
        rename: function () {
          return 'release/documentjs.json';
        },
      },
    },
    cssmin: {
      target: {
        files: {
          'ux/demos/shared/master.min.css': ['ux/*.css'],
        },
      },
    },
    uglify: {
      my_target: {
        files: {
          'docs/ux/demos/shared/master.min.js': [
            'ux/demos/**/*.js',
            '!ux/demos/lib/**',
            '!ux/demos/scratchwork/scratchwork.js',
            '!ux/demos/tts/tts.js',
            '!ux/demos/writing-editor/writing-editor-quill.js',
          ],
        },
      },
    },
    watch: {
      index: {
        files: ['index.html'],
        tasks: ['copy:index'],
      },
      id: {
        files: ['id/*.md', 'id/*.csv'],
        tasks: ['documentjs:id', 'copy:build'],
      },
      media: {
        files: ['media/*.md', 'media/*.csv'],
        tasks: ['documentjs:media', 'copy:build'],
      },
      ux: {
        files: [
          'ux/demos/**',
          'ux/*.css',
          'ux/*.less',
          'ux/*.scss',
          'ux/*.md',
          'ux/*.csv',
        ],
        tasks: ['documentjs:ux', 'cssmin', 'copy:build'],
      },
    },
  });

  grunt.loadNpmTasks('documentjs');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['concurrent']);

  grunt.registerTask('build', [
    'clean:preBuild',
    'documentjs:id',
    'documentjs:media',
    'documentjs:ux',
    'cssmin',
    'uglify',
    'copy:build',
    'copy:versionLinking',
  ]);

  grunt.registerTask('force', function () {
    var versions = grunt.config('documentjs.versions');

    for (version in versions) {
      grunt.task.run('documentjs:' + version + ':forceBuild');
    }
  });

  grunt.registerTask('release', [
    'clean:preRelease',
    'force',
    'clean:postRelease',
    'copy:versionConfig',
  ]);
};
