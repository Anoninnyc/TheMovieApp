module.exports = grunt => {
  grunt.initConfig({
    shell: {
      addAndDeploy: {
        command: mess => ['git add .', 'git commit -m' + mess, 'git push heroku master -f'].join('&&')
      },
    },
  });

  grunt.loadNpmTasks('grunt-shell');

  // sgrunt shell:addAndDeploy:Message_Here

  grunt.registerTask('testGrunt', () => {
    console.log('testing grunt!');
  });
}