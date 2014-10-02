define(function(require, exports, module){
    var ko = require('../vendor/knockout'),
        _ = require('../vendor/lodash'),
        prefs = require('../services/prefs'),
        modalService = require('../services/modal'),
        modals = require('../enums/modals');

    function OptionsViewModel(dialog, data){
        if (!data || !data.project){
            throw new Error('Invalid arguments');
        }

        var self = this;

        this.project = data.project;

        this.favorites = ko.observableArray(prefs.get('favorites') || []);
        this.isFavorite = function(){
            return self.favorites().indexOf(self.project.folder) !== -1;
        }

        this.customs = ko.observableArray(prefs.get('customs') || []);

        this.customName = ko.observable(null);
        this.customName.subscribe(function(value){
            var customs = prefs.get('customs'),
                entity = _.find(customs, function(custom){
                    return custom.path === self.project.path;
                });

            if (!entity){
                entity = {
                    path: self.project.path
                };
                customs.push(entity);
            }

            entity.name = value;

            prefs.set('customs', customs);
        });

        this.customImage = ko.observable(null);
        this.customImage.subscribe(function(value){
            var customs = prefs.get('customs'),
                entity = _.find(customs, function(custom){
                    return custom.path === self.project.path;
                });

            if (!entity){
                entity = {
                    path: self.project.path
                };
                customs.push(entity);
            }

            entity.image = value;

            prefs.set('customs', customs);
        });

        this.back = function(){
            setTimeout(function(){
                modalService.showHandler(modals.GENERAL);
            }, 1);
        }

        this.init = function(){
            var customEntity = _.find(prefs.get('customs'), function(entity){
                return entity.path === self.project.path;
            });

            if (customEntity){
                this.customImage(customEntity.image || null);
                this.customName(customEntity.name || null);
            }
        }

        this.init();
    }

    module.exports = OptionsViewModel;
});
