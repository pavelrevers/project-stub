modules.define('attach-preview', ['i-bem__dom'], function(provide, BEMDOM) {

provide(BEMDOM.decl(this.name, {
    getId: Math.random
}));

});

modules.define('attach-preview', function(provide, Attach) {

provide(Attach.decl({ block: this.name, modName: 'selectable', modVal: true }, {
    onSetMod: {
        'checked': {
            'true': function(){
                this
                    .findBlockInside('check', 'icon')
                    .setMod('type','heart');
            },
            '': function(){
                this
                    .findBlockInside('check', 'icon')
                    .setMod('type','heart-2');
            },
        }
    },
    _onCheck: function(){
        this.emit('check', this.getId());
    }
}, {
    live: function(){
        this.liveBindTo('check', 'click', this.prototype._onCheck);
        return this.__base.apply(this, arguments);
    }
}));

});


modules.define('media-attach', ['i-bem__dom'], function(provide, BEMDOM) {

provide(BEMDOM.decl(this.name, {
    getPreviews: function() {
        return [];
    }
}));

});

modules.define('media-attach',
               ['objects', 'attach-preview'],
               function(provide, Objects, Attach, Media) {

Media.decl({block: 'media-attach', modName: 'select', modVal: 'radio'},
{
    onSetMod: {
        'js' : {
            'inited': function(){
                this.__base.apply(this, arguments);
                // Media.blocks['attach-preview'].on(this.domElem, 'check', this._onSelect, this);
                Attach.on(this.domElem, 'check', this._onSelect, this);
            }
        }
    },
    _onSelect: function(e, id){
        console.log('_onSelect!');
    },

    _getPreviewBlock: function(obj, id){
        Objects.extend(obj.mods = obj.mods || {}, {selectable: true});
        return this.__base.apply(this, arguments);
    },
});

provide(Media);

});
