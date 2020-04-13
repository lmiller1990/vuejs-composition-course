import { Post } from "./types";
import moment from "moment";

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
  title: 'Today'
}

export const thisWeek: Post = {
  ...basePost,
  title: 'This Week',
  created: moment().subtract(2, 'days')
}

export const thisMonth: Post = {
  ...basePost,
  title: 'This Month',
  created: moment().subtract(2, 'weeks')
}
