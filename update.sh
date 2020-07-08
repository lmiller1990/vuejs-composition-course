#! /bin/bash

branches="$(git branch | grep  '1\.')"

for branch in $branches
do
  git checkout $branch
  echo "-- Updating $branch --"
  git checkout 6.4-test-stubs-components -- index.d.ts index.html yarn.lock package.json webpack.config.js jest.config.js tsconfig.json
  git commit -m "update config files"
  break
  git push --set-upstream vuejs-composition-course $branch
  echo "-- Updated $branch --"
done
