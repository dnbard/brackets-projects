define(function(require, exports, module){
    function ProjectsProvider(){
        var FileUtils = brackets.getModule('file/FileUtils'),
            PreferencesManager = brackets.getModule('preferences/PreferencesManager'),
            ProjectManager = brackets.getModule('project/ProjectManager');

        this.getProjectList = function(){
            var recentProjects = PreferencesManager.getViewState('recentProjects') || [],
                requiredProjects = [],
                i;

            for (i = 1; i < recentProjects.length; i++) {
                requiredProjects[i - 1] = this.parsePath(FileUtils.stripTrailingSlash(ProjectManager.updateWelcomeProjectPath(recentProjects[i] + "/")));
            }

            return requiredProjects;
        }

        this.parsePath = function(path) {
            var lastSlash = path.lastIndexOf("/"), folder, rest;
            if (lastSlash === path.length - 1) {
                lastSlash = path.slice(0, path.length - 1).lastIndexOf("/");
            }
            if (lastSlash >= 0) {
                rest = " - " + (lastSlash ? path.slice(0, lastSlash) : "/");
                folder = path.slice(lastSlash + 1);
            } else {
                rest = "/";
                folder = path;
            }

            return {path: path, folder: folder, rest: rest};
        }
    }

    module.exports = ProjectsProvider;
});
