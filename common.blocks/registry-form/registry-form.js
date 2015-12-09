modules.define('registry-form', ['i-bem__dom'], function(provide, BEMDOM) {

provide(BEMDOM.decl(this.name, {
    onSetMod: {
        step: function(modName, modVal) {
            this
                .delMod(this.elem('step'), 'active')
                .setMod(this.elem('step').eq(modVal - 1), 'active')
                .delMod(this.elem('fields'), 'visible')
                .setMod(this.elem('fields').eq(modVal -1), 'visible');

            modVal === '4' && this.delMod(this.elem('next'), 'visible');
        }
    },
    onSubmit: function(e) {
        e.preventDefault();
        // TODO: валидация примерно здесь
        this.setMod('step', +this.getMod('step') + 1);
    }
}, {
    live: function() {
        this.liveBindTo('submit', this.prototype.onSubmit);
    }
}));

});
