modules.define('app', ['i-bem__dom', 'checkbox'], function(provide, BEMDOM, Checkbox) {

provide(BEMDOM.decl(this.name, {
    onSetMod: {
        js: {
            inited: function() {
                console.log('app inited');

                this._header = this.findBlockInside('header');
            }
        }
    },
    onCheckboxToggled: function(e) {
        var checkbox = e.target;

        this._header.setMod('color', checkbox.getMod('type'));
        BEMDOM.update(this.elem('header'), checkbox.getVal());
    }
}, {
    live: function() {
        this.liveInitOnBlockInsideEvent({ modName: 'checked', modVal: '*' }, 'checkbox', this.prototype.onCheckboxToggled);
    }
}));

});
