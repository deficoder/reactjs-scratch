## Getting Started React

1. First of all, Install [NodeJS](https://nodejs.org)

```
cd /usr/local/src
wget https://nodejs.org/dist/v16.15.0/node-v16.15.0-linux-x64.tar.xz

tar xf node-v16.15.0-linux-x64.tar.xz -C /usr/local/ > /dev/null 2>&1

rm -rf /usr/local/bin/node /usr/bin/node /usr/local/bin/npm /usr/bin/npm /usr/local/bin/npx /usr/bin/npx

ln -s /usr/local/node-v16.15.0-linux-x64/bin/node /usr/local/bin/node
ln -s /usr/local/node-v16.15.0-linux-x64/bin/node /usr/bin/node
ln -s /usr/local/node-v16.15.0-linux-x64/bin/npm /usr/local/bin/npm
ln -s /usr/local/node-v16.15.0-linux-x64/bin/npm /usr/bin/npm
ln -s /usr/local/node-v16.15.0-linux-x64/bin/npx /usr/local/bin/npx
ln -s /usr/local/node-v16.15.0-linux-x64/bin/npx /usr/bin/npx
```

2. Start a server

```
git clone https://github.com/deficoder/reactjs-scratch.git && cd reactjs-scratch

cat <<EOF > index.html
<!DOCTYPE html>
    <head>
        <title>ReactJS From Scratch</title>
    </head>
    <body>
        <h1>Welcome to ReactJS</h1>
    </body>
</html>
EOF

python3.9 -m http.server 8001
```

3. Learn React by doing

    **Add React to a Website**

    Step 1: Add a DOM Container to the HTML
    
    ```
    <body>
        <!-- ... existing HTML ... -->

        <div id="like_button_container"></div>

        <!-- ... existing HTML ... -->
    </body>
    ```

    Step 2: Add the Script Tags: add three `<script>` tags to the HTML page right before the closing `</body>` tag
    
    ```
    <body>
        <h1>Welcome to ReactJS</h1>
        <!-- ... existing HTML ... -->

        <div id="like_button_container"></div>

        <!-- ... existing HTML ... -->

        <!-- Load React -->
        <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
        <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>

        <!-- For production -->
        <!-- <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script> -->
        <!-- <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script> -->

        <!-- Load our React component. -->
        <script src="like_button.js"></script>
    </body>
    ```

    Step 3: Create a React Component: Create a file called `like_button.js` next to your HTML page
    
    ```
    cat <<EOF > like_button.js
    'use strict';

    const e = React.createElement;

    class LikeButton extends React.Component {
        constructor(props) {
            super(props);
            this.state = { liked: false };
        }

        render() {
            if (this.state.liked) {
                return 'You liked this.';
            }

            return e(
                'button',
                { onClick: () => this.setState({ liked: true }) },
                'Like'
            );
        }
    }

    const domContainer = document.querySelector('#like_button_container');
    const root = ReactDOM.createRoot(domContainer);
    root.render(e(LikeButton));
    EOF
    ```

    Step 4: Start server
    
    ```
    python3.9 -m http.server 8001
    ```

    **Create a New React App**

    ***Toolchains***

    - [Create React App](https://github.com/facebook/create-react-app): learning React or creating a new (Single-page Application)[https://reactjs.org/docs/glossary.html#single-page-application]
    - [Next.js](https://nextjs.org): building a server-rendered website with Node.js
    - [Gatsby](https://www.gatsbyjs.org): building a static content-oriented website

    - [Neutrino](https://neutrinojs.org): a preset for [React apps](https://neutrinojs.org/packages/react) and [React components](https://neutrinojs.org/packages/react-components)
    - [Nx](https://nx.dev/react): a toolkit for full-stack monorepo development, with built-in support for React, Next.js, [Express](https://expressjs.com), and more
    - [Parcel](https://parceljs.org): a fast, zero configuration web application bundler that [works with React](https://parceljs.org/recipes/react)
    - [Razzle](https://github.com/jaredpalmer/razzle): a server-rendering framework that doesn't require any configuration, but offers more flexibility than Next.js

    ***[Creating a Toolchain from Scratch](https://medium.com/@JedaiSaboteur/creating-a-react-app-from-scratch-f3c693b84658)***

        Step 1: Setup [npm](https://www.npmjs.com)
        - create a new repo in github and choice `Add .gitignore` template with Node
        - clone this repo to your dev host `git clone`
        - initialize your project with `npm init`
        - create `public` and `src` directory in your new project folder
        - copy the following HTML markup into a new file `index.html` inside of the public directory

        ```
        cat <<EOF > public/index.html
        <!-- sourced from https://raw.githubusercontent.com/reactjs/reactjs.org/master/static/html/single-file-example.html -->
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                <title>React Starter</title>
            </head>

            <body>
                <div id="root"></div>
                <noscript>
                    You need to enable JavaScript to run this app.
                </noscript>
                <script src="../dist/bundle.js"></script>
            </body>
        </html>
        EOF
        ```

        Step 2: [Babel](https://babeljs.io) 
        - install dependencies

        ```
        npm install --save-dev @babel/core@7.1.0 @babel/cli@7.1.0 @babel/preset-env@7.1.0 @babel/preset-react@7.0.0
        ```

        - create a file called `.babelrc` in the project root, [Babel has a ton of plugins available](https://babeljs.io/docs/plugins/)

        ```
        cat <<EOF > .babelrc
        {
            "presets": ["@babel/env", "@babel/preset-react"]
        }
        EOF
        ```

        Step 3: [Webpack](https://webpack.js.org) to acquire and configure a bundler Webpack

        - install a few more packages, and you'll want to save these as dev dependencies

        ```
        npm install --save-dev webpack@4.19.1 webpack-cli@3.1.1 webpack-dev-server@3.1.8 style-loader@0.23.0 css-loader@1.0.0 babel-loader@8.0.2
        ```

        - create a file called `webpack.config.js` in the project root

        ```
        cat <<EOF > webpack.config.js
        const path = require("path");
        const webpack = require("webpack");

        module.exports = {
        entry: "./src/index.js",
        mode: "development",
        module: {
            rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: { presets: ["@babel/env"] }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
            ]
        },
        resolve: { extensions: ["*", ".js", ".jsx"] },
        output: {
            path: path.resolve(__dirname, "dist/"),
            publicPath: "/dist/",
            filename: "bundle.js"
        },
        devServer: {
            contentBase: path.join(__dirname, "public/"),
            port: 3000,
            publicPath: "http://localhost:3000/dist/",
            hotOnly: true
        },
        plugins: [new webpack.HotModuleReplacementPlugin()]
        };
        EOF
        ```

        Step 4: React 

        - install dependencies

        ```
        npm i --save-dev react@16.5.2 react-dom@16.5.2
        ```

        - create a file called `index.js` in `src` directory

        ```
        cat <<EOF > src/index.js
        import React from "react";
        import ReactDOM from "react-dom";
        import App from "./App.js";
        ReactDOM.render(<App />, document.getElementById("root"));
        EOF
        ```

        - create another file called `App.js` in `src` directory

        ```
        cat <<EOF > src/App.js
        import React, { Component} from "react";
        import "./App.css";

        class App extends Component{
            render(){
                return(
                <div className="App">
                    <h1> Hello, World! </h1>
                </div>
                );
            }
        }

        export default App;
        EOF
        ```

        - create a css file called `App.css` in `src`

        ```
        cat <<EOF > src/App.css
        .App {
            margin: 1rem;
            font-family: Arial, Helvetica, sans-serif;
            }
        EOF
        ```

        - start dev server: add this into `package.json` scripts and run `npm run dev-server`

        ```
        "dev-server": "webpack-dev-server --mode development"
        ```

        Step 5: HMR

        - install dependencies

        ```
        npm i --save react-hot-loader@4.3.11
        ```

        - mofidy App.js

        ```
        cat <<EOF > src/App.js
        import React, { Component} from "react";
        import {hot} from "react-hot-loader";
        import "./App.css";

        class App extends Component{
            render(){
                return(
                <div className="App">
                    <h1> Hello, World! </h1>
                </div>
                );
            }
        }

        export default hot(module)(App);
        EOF
        ```

        - add `build` into `scripts` and run `npm run build`

        ```
        "build": "webpack --mode development"
        ```

3. Optimizing performance for Production

    [Use the Production Build](https://reactjs.org/docs/optimizing-performance.html#use-the-production-build)
