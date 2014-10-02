define(function (require, exports, module) {
    var ExtensionUtils = brackets.getModule('utils/ExtensionUtils'),
        DomInjector = require('./services/DomInjector'),
        domInjector = new DomInjector(),
        preferences = require('./services/prefs'),
        ProjectObserver = require('./services/projectObserver'),
        projectObserver = new ProjectObserver();

    require('./services/onlineTracking').init();

    preferences.init();

    ExtensionUtils.loadStyleSheet(module, 'styles/main.css');
    ExtensionUtils.loadStyleSheet(module, 'styles/styles.css');
});
