#!/usr/bin/env sh

# abort on errors
set -e

# This is just commented since I manually run build and commit and copy index.html to 404.html to fix router issue.
# build
# npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:r0bban/svealas.git master:gh-pages

cd -