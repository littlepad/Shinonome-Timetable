/*global module:false*/
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        meta: {
            version: '0.1.0',
            banner: '/*! Shinonome-Timetable - v<%= meta.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '* https://github.com/littlepad/Shinonome-Timetable\n' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
                'littepad; Licensed MIT */'
        },
        lint: {
            files: [
                'src/all.js',
                'src/options.js'
            ]
        },
        concat: {
            dist: {
                src: [
                    'src/TimeTableData.js',
                    'src/Train.js',
                    'src/TimeTable.js',
                    'src/main.js'
                ],
                dest: 'src/all.js'
            }
        },
        min: {
            main: {
                src: ['src/all.js'],
                dest: 'public/js/all.min.js'
            },
            options: {
                src: ['src/options.js'],
                dest: 'public/js/options.min.js'
            }
        },
        watch: {
            files: [
                'grunt.js',
                'src/*.js'
            ],
            tasks: 'default'
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                browser: true
            },
            globals: {}
        },
        uglify: {}
    });

    // Default task.
    grunt.registerTask('default', 'concat lint min lint');

};
