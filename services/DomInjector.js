define(function(require, exports, module){
    function DomInjector(){
        var AppInit = brackets.getModule('utils/AppInit'),
            modalService = require('./modal');

        AppInit.appReady(function(){
            var button = $('<div id="ext-projects-toggle" class="brproj-file-submodule" title="Click to manage projects"></div>');
            button.on('click', function(){
                modalService.showHandler();
            });

            $('#project-dropdown-toggle').before(button);
        });
    }
    return DomInjector;
});
