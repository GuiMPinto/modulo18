const { option } = require("grunt")

module.exports = function(grunt)
{
    grunt.initConfig(
    {
        pkg: grunt.file.readJSON('package.json'),
        less:
        {
            development:
            {
                files:
                {
                    'dev/styles/main.css':'src/styles/main.less'
                }
            },
            production:
            {
                options:
                {
                    compress:true
                },
                files:
                {
                    'dist/styles/main.min.css':'src/styles/main.less'
                }
            }
        },
        replace:
        {
            dev:
            {
                options:
                {
                    patterns:
                    [
                        {
                            match:'ENDERECO_DE_CSS',
                            replacement: './styles/main.css'
                        },
                        {
                            match:'ENDERECO_DE_JS',
                            replacement: '../src/scripts/main.js'
                        }
                    ]
                },
                files:
                [{
                    expand: true,
                    flatten: true,
                    src:['src/index.html'],
                    dest: 'dev/'
                }]
            }

            
            
        },

        uglify:
        {
            target:
            {
                files:
                {
                    'dist/scripts/main.min.js':'src/scripts/main.js'
                }
            }
        }
    })

    

    grunt.loadNpmTasks('grunt-contrib-less')
    grunt.loadNpmTasks('grunt-contrib-uglify')

    grunt.registerTask('default',['less:development'])
    grunt.registerTask('build',['less:production','uglify'])
}
