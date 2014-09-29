define(function(require, exports, module){
    function DomInjector(){
        var AppInit = brackets.getModule('utils/AppInit'),
            modalService = require('./modal');

        AppInit.appReady(function(){
            var button = $('<div id="ext-projects-toggle"></div>');
            button.on('click', function(){
                modalService.showHandler();
            });

            $('#project-dropdown-toggle').before(button);
        });
    }
    return DomInjector;
});
