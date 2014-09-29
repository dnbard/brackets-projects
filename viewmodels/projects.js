define(function(require, exports, module){
    var ko = require('../vendor/knockout');

    function ProjectsViewModel(){
        var self = this,
            _ = require('../vendor/lodash'),
            ProjectsProvider = require('../providers/projects'),
            projectsProvider = new ProjectsProvider(),
            ColorProvider = require('../providers/colors'),
            colorProvider = new ColorProvider(),
            ProjectManager = brackets.getModule('project/ProjectManager'),
            prefs = require('../services/prefs');


        this.projects = ko.observableArray([]);
        this.favoriteProjects = ko.observableArray([]);

        this.favorites = ko.observableArray(prefs.get('favorites') || []);

        this.getAlias = function(folder){
            if (typeof folder !== 'string' || folder.length === 0){
                return '#';
            }

            return folder[0].toUpperCase();
        }

        this.getColor = function(str){
            return colorProvider.get(str);
        }

        this.calculateColorDiff = function(hexcolor){
            return (parseInt(hexcolor.replace('#', ''), 16) > 0xffffff/2) ? 'black':'white';
        }

        this.getAliasColor = function(project){
            return self.calculateColorDiff(project.background);
        }

        this.open = function(project){
            ProjectManager.openProject(project.path);
            $('.projects_modal .dialog-button').trigger('click');
        }

        this.favorite = function(project, event){
            if (self.favorites().indexOf(project.folder) !== -1){
                self.favorites.remove(project.folder);
                self.projects.push(project);
                self.favoriteProjects.remove(project);
            } else {
                self.favorites.push(project.folder);
                self.projects.remove(project);
                self.favoriteProjects.push(project);
            }

            prefs.set('favorites', self.favorites());
            event.stopPropagation();
        }

        this.isFavorite = function(model){
            return self.favorites().indexOf(model.folder) !== -1;
        }

        this.init = function(){
            var projects = projectsProvider.getProjectList(),
                favoriteProjects;

            _.each(projects, function(project){
                project.background = self.getColor(project.folder);
            });

            favoriteProjects = _.remove(projects, function(project){
                return self.favorites.indexOf(project.folder) !== -1;
            });

            this.projects(projects);
            this.favoriteProjects(favoriteProjects);
        }

        this.init();
    }

    module.exports = ProjectsViewModel;
});
