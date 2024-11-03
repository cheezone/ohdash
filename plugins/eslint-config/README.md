# eslint-plugin-ohdash

Ohdash eslint plugin.

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-ohdash`:

```sh
npm install eslint-plugin-ohdash --save-dev
```

## Usage

In your [configuration file](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file), import the plugin `eslint-plugin-ohdash` and add `ohdash` to the `plugins` key:

```js
import ohdash from "eslint-plugin-ohdash";

export default [
    {
        plugins: {
            ohdash
        }
    }
];
```


Then configure the rules you want to use under the `rules` key.

```js
import ohdash from "eslint-plugin-ohdash";

export default [
    {
        plugins: {
            ohdash
        },
        rules: {
            "ohdash/rule-name": "warn"
        }
    }
];
```



## Configurations

<!-- begin auto-generated configs list -->
TODO: Run eslint-doc-generator to generate the configs list (or delete this section if no configs are offered).
<!-- end auto-generated configs list -->



## Rules

<!-- begin auto-generated rules list -->
TODO: Run eslint-doc-generator to generate the rules list.
<!-- end auto-generated rules list -->


