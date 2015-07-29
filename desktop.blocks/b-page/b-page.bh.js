module.exports = function(bh) {
    bh.lib.BEM = bh.lib.BEM || (typeof BEM !== 'undefined' ? BEM : null);

    bh.match('b-page', function(ctx, json) {
        return [
            {elem: 'doctype', doctype: json.doctype || '<!DOCTYPE html>'},
            {
                elem: 'root',
                content: [
                    {
                        elem: 'head',
                        content: [
                            json.csp && ctx.extend({}, json.csp, {elem: 'csp'}),
                            {
                                tag: 'meta',
                                attrs: {charset: 'utf-8'}
                            },
                            json['x-ua-compatible'] === false
                                ? false
                                : {elem: 'xUACompatible', 'x-ua-compatible': json['x-ua-compatible']},
                            {
                                elem: 'title',
                                content: json.title
                            },
                            json.favicon
                                ? {elem: 'favicon', url: json.favicon}
                                : '',
                            json.meta,
                            {
                                block: 'i-ua',
                                nonce: json.nonce // @deprecated, удалить в 4x
                            },
                            json.head
                        ]
                    },
                    json
                ]
            }
        ];
    });

    bh.match('b-page', function(ctx) {
        var js = {},
            globalObj = bh.lib.global || {};

        Object.keys(globalObj).forEach(function(p) {
            var prop = globalObj[p];
            if(typeof prop !== 'function') {
                js[p] = prop;
            }
        });

        ctx.mix([
            {elem: 'body'},
            {block: 'i-ua', js: true},
            {block: 'i-global', js: js}
        ]);
        ctx.tag('body');
    });

    bh.match('b-page__xUACompatible', function(ctx, json) {
        return {
            tag: 'meta',
            attrs: {'http-equiv': 'X-UA-Compatible', content: json['x-ua-compatible'] || 'IE=edge'}
        };
    });

    bh.match('b-page__root', function(ctx) {
        ctx.tag('html');
        ctx.bem(false);
        ctx.cls('i-ua_js_no i-ua_css_standard');
        ctx.attr('lang', bh.lib.global && bh.lib.global.lang || 'ru');
    });

    bh.match('b-page__head', function(ctx) {
        ctx.tag('head');
        ctx.bem(false);
    });

    bh.match('b-page__meta', function(ctx) {
        ctx.tag('meta');
        ctx.bem(false);
    });

    bh.match('b-page__title', function(ctx) {
        ctx.tag('title');
        ctx.bem(false);
    });

    bh.match('b-page__doctype', function(ctx, json) {
        return json.doctype;
    });

    bh.match('b-page__favicon', function(ctx, json) {
        ctx.bem(false);
        ctx.tag('link');
        ctx.attr('rel', 'shortcut icon');
        ctx.attr('href', json.url);
    });

    bh.match('b-page__cc', function(ctx, json) {
        ctx.tag(false);

        var others = json.others,
            negation = json.condition.indexOf('!') > -1;

        return [
            '<!--[if ' + json.condition + ']>',
            others ? '<!' : '',
            (negation || others) ? '-->' : '',
            json.content,
            (negation || others) ? '<!--' : '',
            '<![endif]-->'
        ];
    });

    bh.match('b-page__css', function(ctx, json) {
        ctx.bem(false);

        if(json.url) {
            ctx
                .tag('link')
                .attrs({
                    rel: 'stylesheet', href: json.url
                });
        } else {
            ctx
                .tag('style')
                .attr('nonce', json.nonce || bh.lib.global.nonce);
        }

        if(json.hasOwnProperty('ie')) {
            var ie = json.ie;
            if(ie === true) {
                return [8, 9].map(function(v) {
                    return {
                        elem: 'cc',
                        condition: 'IE ' + v,
                        content: {elem: 'css', url: json.url + '.ie' + v + '.css'}
                    };
                });
            }

            if(ie === false) {
                return {
                    elem: 'cc',
                    condition: 'gt IE 9',
                    others: true,
                    content: {elem: 'css', url: json.url}
                };
            }

            if(typeof ie === 'string') {
                return {
                    elem: 'cc',
                    condition: ie,
                    others: ie.indexOf('!') > -1,
                    content: {elem: 'css', url: json.url}
                };
            }
        }
    });

    bh.match('b-page__js', function(ctx, json) {
        ctx
            .bem(false)
            .tag('script')
            .attrs({
                src: json.url
            });
    });

    bh.match('i-jquery', function(ctx, json) {
        return {
            block: 'b-page',
            elem: 'js',
            url: json.url ||
                'https://yastatic.net/jquery/' +
                ctx.mod('version') +
                '/jquery.min.js'
        };
    });
};
