const { FuseBox, SassPlugin, CSSResourcePlugin, CSSPlugin, WebIndexPlugin,
    CopyPlugin, QuantumPlugin, RawPlugin, UglifyESPlugin, EnvPlugin } = require("fuse-box");
const { src, task } = require("fuse-box/sparky");
const historyApiFallback = require('connect-history-api-fallback');
const dotenv = require('dotenv');

dotenv.config()

function bundle({ isProd }) {
    const fuse = FuseBox.init({
        globals: { 'App': 'App' },
        hash: true,
        homeDir: "browser",
        target: 'browser@es6',
        output: "public/$name.js",
        useTypescriptCompiler: true,
        sourceMaps: true,
        plugins: [
            WebIndexPlugin({
                charset: 'utf8',
                title: 'Todo App',
            }),
            [
                SassPlugin({ importer: true }),
                CSSResourcePlugin({
                    dist: 'public/assets',
                    resolve: (f) => `/assets/${f}`
                }),
                CSSPlugin({
                })
            ],
            CopyPlugin({ dest: 'assets', useDefault: false, files: ["*.png", "*.svg", "*.jpg"] }),
            RawPlugin(['*.txt', '*.html']),
            isProd && QuantumPlugin({
                css: true,
                bakeApiIntoBundle: "js",
                uglify: false,
                treeshake: true
            }),
            EnvPlugin({
                SERVER_URL: process.env.SERVER_URL
            })
        ]
    });

    !isProd && fuse.dev(
        // docs: https://fuse-box.org/docs/development/development-server
        {
            open: false,
            port: parseInt(process.env.NODE_PORT || 8000)
        }
        , server => {
            const app = server.httpServer.app;
            app.get(/^(?!\/api).*$/, historyApiFallback());
        }
    );

    const js = fuse.bundle("js")

    js.instructions(`
        > entrypoint.tsx
    `);

    !isProd && js.hmr().watch();

    return fuse.run();
}


task('clean', async () => {
    await src('./public')
        .clean('public/')
        .exec();
});

task('copy', async () => {
    await src(['browser/icon/favicon.ico'])
        .dest('./public/$name')
        .exec()
})

task('dev', ['clean', 'copy'], () => {
    return bundle({ isProd: false })
})

task('dist', ['clean', 'copy'], () => {
    return bundle({ isProd: true })
})

task('default', ['dev'], () => null)