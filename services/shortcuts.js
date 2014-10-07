define(function(require, exports, module){
    var KeyBindingManager = brackets.getModule('command/KeyBindingManager'),
        CommandManager = brackets.getModule('command/CommandManager');

    function ShortcutService(){

    }

    ShortcutService.prototype.add = function(options){
        if (!options || !options.key || !options.handler || !options.name){
            throw new Error('Invalid argument');
        }

        var command = CommandManager.register(options.desc, options.name, options.handler);
        KeyBindingManager.addBinding(command, options.key);
    }

    module.exports = ShortcutService;
});
