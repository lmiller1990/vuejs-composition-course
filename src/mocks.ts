import { Post } from "./types";
import moment from "moment";
import rollupMarkdown from './posts/rollup_markdown.txt'
import rollupHtml from './posts/rollup_html.txt'
import asyncMarkdown from './posts/async_markdown.txt'
import asyncHtml from './posts/async_html.txt'
import testingMarkdown from './posts/testing_markdown.txt'
import testingHtml from './posts/testing_html.txt'

export const basePost: Post = {
  id: 1,
  title: 'Base post',
  markdown: 'Content',
  html: '<p>Content</p>',
  authorId: 1,
  created: moment()
}

export const todayPost: Post = {
  ...basePost,
  id: 1,
  title: 'Test Post (Today) 🎉',
  markdown: 'This is a test post. Check out some of the others to see syntax highlighting in action!',
  html: '<p>This is a test post. Check out some of the others to see syntax highlighting in action!</p>',
}

export const thisWeek: Post = {
  ...basePost,
  id: 2,
  title: 'Test Post (This Week) 📆',
  created: moment().subtract(2, 'days'),
  markdown: 'This is a test post. Sign in to edit it!',
  html: '<p>This is a test post. Sign in to edit it!</p>',
}

export const thisMonth: Post = {
  ...basePost,
  id: 3,
  title: 'Test Post (This Month) 🖖',
  created: moment().subtract(2, 'weeks'),
  markdown: 'This is a test post. Sign in to edit it!',
  html: '<p>This is a test post. Sign in to edit it!</p>',
}

export const rollup: Post = {
  ...basePost,
  id: 4,
  title: 'Bundling with Rollup 📦',
  created: moment(),
  markdown: rollupMarkdown,
  html: rollupHtml,
  authorId: 1
}

export const asyncComponents: Post = {
  ...basePost,
  id: 5,
  title: 'Async Components and Bundle Splitting 🛠',
  created: moment(),
  markdown: asyncMarkdown,
  html: asyncHtml,
  authorId: 1
}

export const testing: Post = {
  ...basePost,
  id: 6,
  title: 'Building a Testing Framework from Scratch 🔬',
  created: moment(),
  markdown: testingMarkdown,
  html: testingHtml,
  authorId: 1
}
