define(function(require, exports){
    var Dialogs = brackets.getModule('widgets/Dialogs'),
        modalTemplate = require('text!../templates/projects.html'),
        ko = require('../vendor/knockout'),
        ModalViewModel = require('../viewmodels/projects');

    function showHandler(){
        var dlg = Dialogs.showModalDialogUsingTemplate(modalTemplate)._$dlg,
            viewModel = new ModalViewModel(dlg);

        ko.applyBindings(viewModel, dlg[0]);
        return viewModel;
    }

    exports.showHandler = showHandler;
});
