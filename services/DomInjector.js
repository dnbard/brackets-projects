define(function(require, exports, module){
    function DomInjector(){
        var AppInit = brackets.getModule('utils/AppInit'),
            modalService = require('./modal'),
            ShortcutService = require('./shortcuts'),
            shortcutService = new ShortcutService();

        function showProjectsPanel(){
            modalService.showHandler();
        }

        AppInit.appReady(function(){
            var button = $('<div id="ext-projects-toggle" class="brproj-file-submodule" title="Click to manage projects"></div>');
            button.on('click', showProjectsPanel);

            $('#project-dropdown-toggle').before(button);

            shortcutService.add({
                name: 'ext-projects-show',
                desc: 'Show projects panel',
                key: {key: 'Alt-P'},
                handler: showProjectsPanel
            });
        });
    }
    return DomInjector;
});
