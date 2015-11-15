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
    content : {
        block : 'app',
        content : [
            {
                block: 'header',
                mix: { block: 'app', elem: 'header' }
            },
            {
                block : 'table',
                content : [
                    {
                        elem : 'row',
                        content : [
                            {
                                elem : 'cell',
                                content : [
                                    {
                                        block : 'checkbox',
                                        mods : { theme : 'islands', size : 'm', type: 'green' },
                                        val : 'first',
                                        text : 'I am green'
                                    },
                                    {
                                        block : 'checkbox',
                                        mods : { theme : 'islands', size : 'm', type: 'red' },
                                        val : 'second',
                                        text : 'I am red'
                                    },
                                    {
                                        block : 'checkbox',
                                        mods : { theme : 'islands', size : 'm', type: 'green' },
                                        val : 'third',
                                        text : 'I am green again'
                                    },
                                    {
                                        block : 'checkbox',
                                        mods : { theme : 'islands', size : 'm', type: 'red' },
                                        val : 'more',
                                        text : 'I am red too'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
};
