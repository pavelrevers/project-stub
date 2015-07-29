BEM.DOM.decl('total-amount', {
    onSetMod: {
        js: {
            inited: function() {
                var totalFromApi = 100500;

                this.domElem.text(BEM.helpers.VAT(totalFromApi));
            }
        }
    }
});
