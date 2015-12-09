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
            block: 'registry-form',
            mods: { step: 1 },
            content: [
                {
                    elem: 'steps',
                    content: [
                        {
                            elem: 'step',
                            elemMods: { active: true },
                            content: 1
                        },
                        {
                            elem: 'step',
                            content: 2
                        },
                        {
                            elem: 'step',
                            content: 3
                        },
                        {
                            elem: 'step',
                            content: 4
                        }
                    ]
                },
                {
                    elem: 'fields-set',
                    content: [
                        {
                            elem: 'fields',
                            elemMods: { visible: true },
                            content: [
                                'первый шаг',
                                {
                                    block: 'input',
                                    mods: { theme: 'islands', size: 'm' }
                                }
                            ]
                        },
                        {
                            elem: 'fields',
                            content: [
                                'второй шаг',
                                {
                                    block: 'input',
                                    mods: { theme: 'islands', size: 'm' }
                                }
                            ]
                        },
                        {
                            elem: 'fields',
                            content: [
                                'третий шаг',
                                {
                                    block: 'input',
                                    mods: { theme: 'islands', size: 'm' }
                                }
                            ]
                        },
                        {
                            elem: 'fields',
                            content: [
                                'четвертый шаг',
                                {
                                    block: 'input',
                                    mods: { theme: 'islands', size: 'm' }
                                }
                            ]
                        }
                    ]
                },
                {
                    block: 'button',
                    mods: { theme: 'islands', size: 'm', type: 'submit' },
                    mix: { block: 'registry-form', elem: 'next', elemMods: { visible: true } },
                    text: 'Далее'
                }
            ]
        }
    ]
};
