const common = require('./common');

const shared = {
    name: 'dev',
    api: {
        port: 1337
    }
};

module.exports = {
    build: common.merge(
        common.build,
        {
            mode: 'development'
        }
    ),
    server: common.merge(
        common.shared,
        common.server,
        shared,
        {}
    ),
    client: common.merge(
        common.shared,
        common.client,
        shared,
        {})
};
