#! /bin/bash

branches="$(git branch | grep  '1\.')"

for branch in $branches
do
  git checkout $branch
  echo "-- Updating $branch --"
  git checkout master -- yarn.lock package.json 
  git commit -m "update config files"
  break
  git push --set-upstream vuejs-composition-course $branch
  echo "-- Updated $branch --"
done
