module.exports = {
    block : 'page',
    title : 'Title of the page',
    favicon : '/favicon.ico',
    head : [
        { elem : 'meta', attrs : { name : 'description', content : '' } },
        { elem : 'meta', attrs : { name : 'viewport', content : 'width=device-width, initial-scale=1' } },
        { elem : 'css', url : 'index.min.css' }
    ],
    scripts: [{ elem : 'js', url : 'index.min.js' }],
    mods : { theme : 'islands' },
    content : [
        {
            block : 'row',
            content : [
                {
                    elem : 'col',
                    mods : { sw : 2, mw : 4, lw : 12, xl : 12, xxl : 12 },
                    content : [
                        'Первая колонка'
                    ]
                },
                {
                    elem : 'col',
                    mods : { sw : 10, mw : 8, lw : 0, xl : 0 },
                    content : [
                        'Вторая колонка'
                    ]
                }
            ]
        }
    ]
};
