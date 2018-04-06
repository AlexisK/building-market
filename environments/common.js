// CONFIG
module.exports = {
    build: {},
    shared: {
        version: '1.0.0.0-pre-alpha'
    },
    client: {},
    server: {},
    merge
};



// HELPERS

function _merge(base, override) {
    for ( let k in override) {
        let baseValue = base[k];
        if (baseValue && typeof(baseValue) === 'object' && baseValue.constructor !== Array) {
            _merge(base[k], override[k]);
        } else {
            base[k] = override[k];
        }
    }
    return base;
}

function merge() {
    let args = Array.prototype.slice.call(arguments);
    let result = {};

    for ( let i = 0; i < args.length; i++ ) {
        _merge(result, args[i]);
    }
    return result;
}
