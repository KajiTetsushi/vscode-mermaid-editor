# Mermaid Editor

[![Build Status](https://dev.azure.com/tomoyukim-vscode-extension/vscode-mermaid-editor-pipeline/_apis/build/status/tomoyukim.vscode-mermaid-editor?branchName=master)](https://dev.azure.com/tomoyukim-vscode-extension/vscode-mermaid-editor-pipeline/_build/latest?definitionId=1&branchName=master)

Mermaid Editor is VSCode extension inspired by [official mermaid live editor](https://mermaidjs.github.io/mermaid-live-editor/) which provides mainly the following features:

- Live edit `.mmd` file with [mermaid.js](https://mermaidjs.github.io/) diagram
- Generate image file from `.mmd` file with preferred format (**png**, **jpg**, **webp** and **svg**).
- Copy image to clipboard directly.
- Customize configuration for individual `mmd` diagram by using atrribute which is available in this extension.

Mermaid Editor does not contain syntax highlighting for Mermaid charting language.
But don't warry, a great plugin [Mermaid Markdown Syntax Highlighting](https://marketplace.visualstudio.com/items?itemName=bpruitt-goddard.mermaid-markdown-syntax-highlighting) works with Mermaid Editor.

Mermaid Editor is also available on [Open VSX Registry](https://open-vsx.org/extension/tomoyukim/vscode-mermaid-editor) for developers who love FLOSS binaries of VSCode.

Mermaid Editor is implemented as 100% local solution mainly using mermaid.js and VSCode SDK.
It means Mermaid Editor does NOT require online environment and NOT send your code to any remote server in order to work.

Enjoy!

## Usage

The extension's activated when opening `.mmd` file.

### Open live preview

- Select `Mermaid:Preview mermaid` from context menu or command palette
- Click `Mermaid:Preview diagram` icon at right corner
- `ctrl+alt+[` on `.mmd` file

![](https://user-images.githubusercontent.com/1187581/78126099-efef5f00-744c-11ea-9a07-370d9714621d.png)
![](https://user-images.githubusercontent.com/1187581/78126199-1e6d3a00-744d-11ea-8c79-25f6f1c08517.png)

### Generate image

Generate command is only available when `.mmd` file is opened and live preview is activated.

- Select `Mermaid:Generate image` from context menu or command palette
- Click `Mermaid:Generate image` icon
- `ctrl+alt+]` on `.mmd` file

![](https://user-images.githubusercontent.com/1187581/78126965-4e690d00-744e-11ea-96be-d59cf0965e26.png)
![](https://user-images.githubusercontent.com/1187581/78127020-6345a080-744e-11ea-9ad0-d2f24dec4d1e.png)

### Copy image to clipboard

Copy command is only availab e when "Mermaid Editor Preview" is focused.

- Click `Mermaid:Copy image` icon
- `ctrl+alt+;` on `Mermaid Editor Preview`

### Change scale of live preview

Zoom in/out is supported for live preview.

- Select `Mermaid:Zoom in`, `Mermaid:Zoom out`, `Mermaid:Reset zoom`, `Mermaid:Zoom to specific scale` from command palette
- Click `Mermaid:Zoom in`, `Mermaid:Zoom out` icon focusing live preview panel
- Zoom out: `ctrl+alt+-`
- Zoom in: `ctrl+alt+=`
- Reset zoom: `ctrl+alt+0`

![](https://user-images.githubusercontent.com/1187581/78127053-76587080-744e-11ea-9861-c4a4dc71a4fe.png)

## Attributes

This extension supports attribute to specify preferred configuration for each `.mmd` file. The attribute have to be described in comment of mermaid syntax.

**NOTE: The attribute syntax with curly brackets (@config{}, @backgroundColor{}, @outputScale{}) was obsoleted. Use parenthesis (@config(), @backgroundColor(), @outputScale()) instead, please.**

### @config(path_to_config)

Each `.mmd` file can be associated with [mermaid configuration](https://mermaid-js.github.io/mermaid/#/mermaidAPI?id=configuration). With this attribute, `.mmd` file can read specified configuration. `path_to_config` have to be described as relative path to the config json file from associated `.mmd` file. If this attribute is not provided, default config file setting up in `mermaid-editor.preview.defaultMermaidConfig` is applied.

```
sequenceDiagram
%% @config(./path/to/config.json)
    Alice->>John: Hello John, how are you?
```

### @backgroundColor(color)

Each `.mmd` file can be associated with preferred background color. With this attribute, `.mmd` can read specifed background color with CSS style property format.If this attribute is not provided, default background color setting up in `mermaid-editor.preview.backgroundColor` is applied. The followings are example.

```
sequenceDiagram
%% @backgroundColor(red)
    Alice->>John: Hello John, how are you?
```

```
sequenceDiagram
%% @backgroundColor(#ff0000)
    Alice->>John: Hello John, how are you?
```

```
sequenceDiagram
%% @backgroundColor(rgb(255, 0, 0))
    Alice->>John: Hello John, how are you?
```

### @outputScale(scale_factor)

Each `.mmd` file can be associated with preferred output scale. With this attribute, the diagram can be generated with preferred scale factor.If this attribute is not provided, default scale setting up in `mermaid-editor.generate.scale` is applied. Positive number is only permitted for this attribute. If invalid value is set, default value is used as above. The followings are example.

```
sequenceDiagram
%% @outputScale(2.5)
    Alice->>John: Hello John, how are you?
```

## Configuration

Settings for look & feel in preview or image generator.

| Setting                                     | Default | Description                                                                                                                                                                    |
| ------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| mermaid-editor.preview.defaultMermaidConfig |         | Relative path to the default configuration json file for mermaidjs.                                                                                                            |
| mermaid-editor.preview.backgroundColor      | white   | Default background color for live preview and generated image.                                                                                                                 |
| mermaid-editor.preview.errorOutputOnSave    | true    | Show error output console whe saving file if there's error message.<br/> **Note**: Error output in the console itself is always available regardless of this configuration.    |
| mermaid-editor.generate.type                | svg     | Output image file type [svg, png, jpg, webp].                                                                                                                                  |
| mermaid-editor.generate.outputPath          |         | Relative path to the output target directory from project root.                                                                                                                |
| mermaid-editor.generate.useCurrentPath      | true    | Use relative output path as same as target mmd file instead of 'outputPath'.                                                                                                   |
| mermaid-editor.generate.scale               | 1.0     | Scale of the output image. Only positive number (>0) is permitted. Otherwise, `1.0` is used.                                                                                   |
| mermaid-editor.generate.quality             | 1.0     | Quality of the output image. A number between 0 and 1 to be used when creating images using file formats that support lossy compression like jpeg or webp. Otherwise, ignored. |

## Credits

This extension uses [Feather icon set](https://www.iconfinder.com/iconsets/feather) under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/)
