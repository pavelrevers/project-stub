module.exports = function(bh) {
    bh.match('total-amount', function(ctx) {
        ctx
            .js(true)
            .content(bh.lib.helpers.VAT(300));
    });
};
