modules.define('app', ['i-bem__dom', 'checkbox'], function(provide, BEMDOM, Checkbox) {

provide(BEMDOM.decl(this.name, {
    onSetMod: {
        js: {
            inited: function() {
                console.log('app inited');

                this._table = this.findBlockInside('table');
                this._header = this.findBlockInside('header');

                Checkbox.on(this._table.domElem, { modName: 'checked', modVal: '*' }, this.onCheckboxToggled, this);
            },
            '': function() {
                Checkbox.un(this._table.domElem, { modName: 'checked', modVal: '*' });
            }
        }
    },
    onCheckboxToggled: function(e) {
        var checkbox = e.target;

        this._header.setMod('color', checkbox.getMod('type'));
        BEMDOM.update(this.elem('header'), checkbox.getVal());
    }
}));

});
