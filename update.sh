#! /bin/bash

# branches="$(git branch | grep  '1\.')"
arr1=(1.0-getting-started 1.1-creating-timeline-component 1.2-our-first-test 1.3-reactive-updates-using-ref 1.4-testing-active-tab 1.5-getting-started-with-tdd 1.6-filtering-posts-with-computed 1.7-refactoring-with-confidence
)

arr2=(2.1-load-states-with-suspense 2.2-defining-a-flux-store 2.3-loading-posts-with-axios 2.4-the-use-store-hook 2.5-mocking-the-backend 2.6-routing-with-vue-router 2.7-updating-the-tests)

arr3=(3.0-new-post-link-nav-bar 3.1-post-editor 3.2-template-refs 3.3-rendering-markdown 3.4-real-time-preview 3.5-syntax-highlighting 3.6-emitting-a-submit-event 3.7-testing-post-writer)

arr4=(4.1-adding-a-new-post-to-the-store 4.2-use-modal-composable 4.3-reusable-form-input 4.4-framework-agnostic-validation 4.5-creating-the-signup-form 4.6-form-validation-and-submission 4.7-provide-inject 4.8-new-post-specs 4.9-signup-validation-testing)

arr5=(5.0-authentication-and-optimization 5.0-complete 5.1-adding-users-to-the-store 5.2-dynamic-components 5.3-optimizing-with-mark-ref 5.4-navigation-guards 5.4-router-navigation-guards 5.5-showing-posts-with-use-params 5.6-edit-post-link 5.7-authorizating-editing 5.8-conditional-edit-button 5.8-routing-tests 5.8-some-bugs-editing-post 5.9-testing-show-post-authorix 5.9-testing-show-post-authorization prepare/5.8)

arr6=(6.1-editing-pots 6.1-styling-show-post 6.2-editing-posts 6.3-testing-in-isolation 6.4-test-stubs-components)

for branch in ${arr2[@]}
do
  echo "-- Checking out $branch --"
  git checkout $branch
  echo "-- Updating $branch --"
  git push 
  echo "-- Updated $branch --"
done
