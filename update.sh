#! /bin/bash

# branches="$(git branch | grep  '1\.\|2\.\|3')"
branches="$(git branch | grep  '4\.')"

for branch in $branches
do
  git checkout $branch
  echo "-- Updating $branch --"
  git checkout 4.8-new-post-specs -- index.d.ts
  git add index.html yarn.lock package.json webpack.config.js jest.config.js tsconfig.json
  git commit -m "update config files"
  git push --set-upstream vuejs-composition-course $branch
  echo "-- Updated $branch --"
done
