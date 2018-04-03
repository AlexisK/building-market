# building-market

For now this will contain some manuals:

## Structure:

* Project should have 2 separate npm instances: `/server` and `/client`
* Each npm, instance should have 2 main directories: `./src` (working directory) and `./build` (compressed and optimized result).

## Git workflow:

* Branch `master` should only contain checked production-ready builds
* Branch `develop` is the main working branch (no direct pushes!)
* Any feature/fix should be made within it's own branch
* Merge to develop should only happen using pull request

Git branches naming examples:
* `feature/optimized-builds` - new features
* `bugfix/login-form` - fixes to existing features
* `refactor/css-structure` - updated implementation but not functionality
