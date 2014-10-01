define(function(require, exports){
    var Dialogs = brackets.getModule('widgets/Dialogs'),
        templateGeneral = require('text!../templates/projects.html'),
        templateOptions = require('text!../templates/options.html'),
        ko = require('../vendor/knockout'),
        ProjectsViewModel = require('../viewmodels/projects'),
        OptionsViewModel = require('../viewmodels/options'),
        Modals = require('../enums/modals');

    function showHandler(modalType, args){
        var modalTemplate, ModalViewModel;

        modalType = modalType || Modals.GENERAL;

        switch(modalType){
            case Modals.GENERAL:
                modalTemplate = templateGeneral;
                ModalViewModel = ProjectsViewModel;
                break;
            case Modals.OPTIONS:
                modalTemplate = templateOptions;
                ModalViewModel = OptionsViewModel;
                break;
        }

        var dlg = Dialogs.showModalDialogUsingTemplate(modalTemplate)._$dlg,
            viewModel = new ModalViewModel(dlg, args);

        ko.applyBindings(viewModel, dlg[0]);
        return viewModel;
    }

    exports.showHandler = showHandler;
});
