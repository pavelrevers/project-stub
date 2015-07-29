var techs = {
        // essential
        fileProvider: require('enb/techs/file-provider'),
        fileMerge: require('enb/techs/file-merge'),

        // optimization
        borschik: require('enb-borschik/techs/borschik'),

        // css
        css: require('enb/techs/css'),
        cssAutoprefixer: require('enb-autoprefixer/techs/css-autoprefixer'),

        // js
        js: require('enb/techs/js'),

        // bemhtml
        bh: require('enb-bh/techs/bh-server-include'),
        htmlFromBemjson: require('enb-bh/techs/html-from-bemjson')
    },
    enbBemTechs = require('enb-bem-techs'),
    levels = [
        { path: 'libs/bem-bl/blocks-common', check: false },
        { path: 'libs/bem-bl/blocks-desktop', check: false },
        'desktop.blocks'
    ];

module.exports = function(config) {
    var isProd = process.env.YENV === 'production';

    config.nodes('*.bundles/*', function(nodeConfig) {
        nodeConfig.addTechs([
            // essential
            [enbBemTechs.levels, { levels: levels }],
            [techs.fileProvider, { target: '?.bemjson.js' }],
            [enbBemTechs.bemjsonToBemdecl],
            [enbBemTechs.deps],
            [enbBemTechs.files],

            // css
            [techs.css, { target: '?.noprefix.css' }],
            [techs.cssAutoprefixer, {
                sourceTarget: '?.noprefix.css',
                destTarget: '?.css',
                browserSupport: ['last 2 versions', 'ie 10', 'opera 12.1']
            }],

            // bh
            [techs.bh, {
                target: '?.bh.js',
                sourceSuffixes: ['vanilla.js', 'bh.js'],
                jsAttrName: 'data-bem',
                jsAttrScheme: 'json'
            }],
            [techs.htmlFromBemjson, { bhFile: '?.bh.js' }],

            // js
            [techs.js, { sourceSuffixes: ['vanilla.js', 'js'], target: '?.js' }],

            // borschik
            [techs.borschik, { sourceTarget: '?.js', destTarget: '_?.js', freeze: true, minify: isProd }],
            [techs.borschik, { sourceTarget: '?.css', destTarget: '_?.css', tech: 'cleancss', freeze: true, minify: isProd }]
        ]);

        nodeConfig.addTargets(['?.html', '_?.css', '_?.js']);
    });
};
