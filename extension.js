// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const fs = require("fs");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "sass-partials" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json

  let disposable = vscode.commands.registerCommand(
    "sass-partials.helloWorld",
    function () {
      const fs = require("fs");
      const path = require("path");
      const { promisify } = require("util");

      function createDirectory(dirPath) {
        return promisify(fs.mkdir)(dirPath);
      }

      function createFile(filePath, content) {
        return promisify(fs.writeFile)(filePath, content, "utf-8");
      }

      function scaffoldProject(projectName) {
        createDirectory(path.join('', projectName))
          .then(() => {
            return createDirectory(path.join('', projectName, "sass"));
          })
          // base folder
          .then(() => {
            return createDirectory(
              path.join('', projectName, "sass", "base")
            );
          })
          //   base
          .then(() => {
            return createFile(
              path.join('', projectName, "sass", "base", "_base.scss"),
              `body {
            background-color : var(--clr-neutral-200);
            font-family: var(--ff-primary);
            font-size: var(--fs-l);
            font-weight: var(--fw-regular);
            direction: rtl;
        }`
            );
          })
          // reset
          .then(() => {
            return createFile(
              path.join('', projectName, "sass", "base", "_reset.scss"),
              `/* Box sizing rules */
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }
        
        /* Remove default margin */
        * {
          margin: 0;
          padding: 0;
        }
        
        textarea, input {
          outline: none;
        }
        
        /* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
        ul,
        ol[role="list"] {
          list-style: none;
        }
        
        /* Set core root defaults */
        html:focus-within {
          scroll-behavior: smooth;
        }
        
        /* Set core body defaults */
        body {
          min-height: 100vh;
          text-rendering: optimizeSpeed;
          line-height: 1.5;
        }
        
        /* A elements that don't have a class get default styles */
        a:not([class]) {
          text-decoration-skip-ink: auto;
        }
        
        /* Make images easier to work with */
        img,
        picture {
          max-width: 100%;
          display: block;
        }
        
        /* Inherit fonts for inputs and buttons */
        input,
        button,
        textarea,
        select {
          font: inherit;
        }
        
        /* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
        @media (prefers-reduced-motion: reduce) {
          html:focus-within {
            scroll-behavior: auto;
          }
        
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }`
            );
          })
          // root
          .then(() => {
            return createFile(
              path.join('', projectName, "sass", "base", "_root.scss"),
              `@use "../abstracts/" as *;

        :root {
          // colors
          @each $clr, $shades in $colors {
            @each $key, $value in $shades {
              --clr-#{$clr}-#{$key}: #{$value};
            }
          }
        
          //   fonts sizes
          @each $key, $value in $font-sizes {
            --fs-#{$key}: #{$value};
          }
        
          //   fonts weights
          @each $key, $value in $font-weights {
            --fw-#{$key}: #{$value};
          }
        
          --ff-primary : 'EB Garamond', serif;
          --default-radius: .5rem;
        };`
            );
          })
          // index
          .then(() => {
            return createFile(
              path.join('', projectName, "sass", "base", "_index.scss"),
              `@forward "root";
@forward "reset";
@forward "base";`
            );
          })
          //   abstracts folder
          .then(() => {
            return createDirectory(
              path.join('', projectName, "sass", "abstracts")
            );
          })
          //   colors
          .then(() => {
            return createFile(
              path.join(
                '',
                projectName,
                "sass",
                "abstracts",
                "_colors.scss"
              ),
              `$colors: (
        primary: (
          300: hsl(227, 67%, 52%),
          310: hsl(227, 67%, 62%),
          350: hsl(227, 67%, 40%),
          400: hsl(0, 67%, 52%),
          410: hsl(0, 67%, 62%),
          450: hsl(0, 67%, 40%),
          900: hsl(0, 0%, 0%),
        ),
        neutral: (
          100: #ffff,
          200: hsl(0, 0%, 91%),
          300: hsl(0, 0%, 85%),
          400: hsl(0, 0%, 70%),
        ),
      );`
            );
          })
          .then(() => {
            return createFile(
              path.join(
                '',
                projectName,
                "sass",
                "abstracts",
                "_types.scss"
              ),
              `$font-sizes: (
        s: 0.8rem,
        m: 1rem,
        l: 1.2rem,
        xl: 1.5rem,
        xxl: 2rem,
        xxxl: 2.5rem,
      );
      
      $font-weights: (
        light: 300,
        regular: 400,
        medium: 500,
        semi-bold: 600,
        bold: 700,
        extra-bold: 800,
      );`
            );
          })
          // index
          .then(() => {
            return createFile(
              path.join(
                '',
                projectName,
                "sass",
                "abstracts",
                "_index.scss"
              ),
              `@forward "colors";
          @forward "types";`
            );
          })
          // pages folder
          .then(() => {
            return createDirectory(
              path.join('', projectName, "sass", "pages")
            );
          })
          // index
          .then(() => {
            return createFile(
              path.join('', projectName, "sass", "pages", "_index.scss"),
              ""
            );
          })
          // components folder
          .then(() => {
            return createDirectory(
              path.join('', projectName, "sass", "components")
            );
          })
          // index
          .then(() => {
            return createFile(
              path.join(
                '',
                projectName,
                "sass",
                "components",
                "_index.scss"
              ),
              ""
            );
          })
          // the main sass file
          // styles
          .then(() => {
            return createFile(
              path.join('', projectName, "sass", "style.scss"),
              `@use "base";
          @use "pages";
          @use "components";`
            );
          })
          .then(() => {
            vscode.window.showInformationMessage(
              `Project ${projectName} was successfully scaffolded at ${path.join(
                '',
                projectName
              )}`
            );
            console.log();
          })
          .catch((error) => {
            console.log(error);
          });
      }

      // Replace 'test-project' with user input

      if (vscode.workspace.workspaceFolders !== undefined) {
        let wf = vscode.workspace.workspaceFolders[0].uri.path;

        let path_ = `${wf}`;

        scaffoldProject(path_ + "/styles");
      } else {
        let message =
          "YOUR-EXTENSION: Working folder not found, open a folder an try again";

        vscode.window.showErrorMessage(message);
      }
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
