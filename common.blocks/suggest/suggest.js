// TODO: jquery deps is temporary
modules.define('suggest', ['i-bem__dom', 'keyboard__codes', 'jquery'], function(provide, BEMDOM, keyCodes, $, Suggest) {

provide(Suggest.decl({
    _onMenuItemClick: function(e, data) {
        this._input.setVal(data.item.params.val.value); // this._menu.getVal()
        this.emit('change', data.item);
    },
    _onKeyDown: function(e) {
        this.__base.apply(this, arguments);

        if(e.keyCode === keyCodes.ENTER && this.hasMod('opened')) {
            e.preventDefault();

            console.log('this._menu', this._menu, 'this._menu.getItems()', this._menu.getItems())

            for (var i = 0, items = this._menu.getItems(), len = items.length; i < len; i++) {
                if (items[i].hasMod('hovered')) {
                    var currentItem = items[i];
                    break;
                }
            }

            this._input.setVal(currentItem.getVal().value);
            this
                .emit('change', currentItem)
                .delMod('opened');
        }
    },
    _buildItemsBemjson: function(items) {
        var mods = this.getMods();
        return items.map(function(item) {
            var isObject = typeof item === 'object';
            return {
                block: 'menu-item',
                mods: {
                    theme: mods.theme,
                    disabled: mods.disabled
                },
                val: isObject ? item.val : undefined,
                content: isObject ? item.content : item
            };
        });
    }
}));

});
