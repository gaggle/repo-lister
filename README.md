# repo-lister [![Build Status](https://travis-ci.org/gaggle/repo-lister.svg?branch=master)](https://travis-ci.org/gaggle/repo-lister)

Available at http://repos.jonlauridsen.com

Uses [repo-components][components] ([Storybook][storybook])


## Cutting a new release
Run this command to automatically increment version and push a new release:
```bash
npm run clean && npm test && npm version patch && (export VERSION=`node -p "require('./package.json').version"`; git push && git push origin v$VERSION)
```


[components]: https://github.com/gaggle/repo-components
[storybook]: https://gaggle.github.io/repo-components/
