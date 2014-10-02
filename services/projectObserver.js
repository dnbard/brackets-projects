define(function(require, expotrs, module){
    var ProjectManager = brackets.getModule('project/ProjectManager'),
        prefs = require('../services/prefs'),
        _ = require('../vendor/lodash');

    function ProjectObserver(){
        this.$PM = $(ProjectManager);

        this.$PM.on('projectOpen', function(event, directory){
            var customs = prefs.get('customs'),
                projectId = directory._path.split('/').join(''),
                customProject = _.find(customs, function(custom){
                return custom.path.split('/').join('') === projectId;
            }),
                $name = $('#project-name__custom'),
                projectName;

            if (customProject && customProject.name){
                projectName = customProject.name;

                if ($name.length === 0){
                    $('#project-dropdown-toggle').prepend('<span id="project-name__custom">'+projectName+'</span>');
                } else {
                    $name.text(projectName);
                }
            } else {
                $name.remove();
            }
        });
    }

    module.exports = ProjectObserver;
});
