# repo-lister [![Build Status](https://travis-ci.org/gaggle/repo-lister.svg?branch=master)](https://travis-ci.org/gaggle/repo-lister)
Generate a static site showing an overview of your repositories. Well, actually [repo-scraper][repo-scraper] generates the data of your repositories, but repo-lister generates the site that **shows** that data.

Relies on [repo-components][components] ([Styleguide][styleguide]), and is consumed by [repos.jonlauridsen.com][repos.jonlauridsen.com].


## Cutting a new release
Run this command to automatically increment version and push a new release:
```bash
npm run clean && npm test && npm version patch && (export VERSION=`node -p "require('./package.json').version"`; git push && git push origin v$VERSION)
```


[components]: https://github.com/gaggle/repo-components
[styleguide]: https://gaggle.github.io/repo-components/
[repo-scraper]: https://github.com/gaggle/repo-scraper
[repos.jonlauridsen.com]: https://github.com/gaggle/repos.jonlauridsen.com
