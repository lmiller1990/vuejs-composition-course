#! /bin/bash

# branches="$(git branch | grep  '1\.')"
arr1=(1.0-getting-started 1.1-creating-timeline-component 1.2-our-first-test 1.3-reactive-updates-using-ref 1.4-testing-active-tab 1.5-getting-started-with-tdd 1.6-filtering-posts-with-computed 1.7-refactoring-with-confidence
)

for branch in ${arr1[@]}
do
  echo "-- Checking out $branch --"
  git checkout $branch
  echo "-- Updating $branch --"
  git checkout master -- yarn.lock package.json 
  git commit -m "update to rc5"
  git push $branch
  echo "-- Updated $branch --"
done
