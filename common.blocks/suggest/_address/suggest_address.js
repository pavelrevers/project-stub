// Пример запроса: https://suggest-maps.yandex.ru/suggest-geo?part=%D0%BC%D1%8B%D1%82&search_type=tp&v=5&reverse_geo_name=0
// Описание на вики: https://old.wiki.yandex-team.ru/serp/suggest/geo/

modules.define('suggest', ['functions__debounce', 'jquery'], function(provide, Debounce, $, Suggest) {

var cache = {};

provide(Suggest.decl({ modName: 'address', modVal: true }, {
    onSetMod: {
        js: {
            inited: function() {
                this.__base.apply(this, arguments);
                this.getData = Debounce(this.getData, 450, this);
            }
        }
    },
    _onInputChange: function(e) {
        this.__base.apply(this, arguments);

        this.hasMod('opened') && this.getData(e);

        return this;
    },
    // TODO: отдельный dataprovider
    getData: function(e) {
        this._xhr && this._xhr.abort();

        if (this.hasMod('opened')) {
            var _this = this,
                val = e.target.getVal();

            if (cache[val]) return this._onGotData(cache[val]);

            var xhr = this._xhr = $.ajax({
                url: 'https://suggest-maps.yandex.ru/suggest-geo?search_type=tp&v=5&reverse_geo_name=0&part=' + encodeURIComponent(val),
                dataType: 'jsonp'
            });

            xhr.then(function(items) {
                var items = items[1].map(function(item) {
                        return {
                            val: { value: item[1] },
                            content: item[1]
                        };
                    });

                cache[val] = items;

                _this._onGotData(items);
            });
        }

        return this;
    },
    _onGotData: function(items) {
        items.length ?
            this._setMenuContent(items) :
            this.delMod('opened');
    }
}));

});
