import { State, initialState, createStore } from "./store"
import { Post } from "./types"
import moment from "moment"

const mockPost: Post = {
  id: 1,
  authorId: 1,
  html: '<p>Hello</p>',
  markdown: 'Hello',
  created: moment(),
  title: 'Test Post'
}

jest.mock('axios', () => ({
  get: () => {
    return {
      data: [mockPost]
    }
  }
}))

describe('fetchPosts', () => {
  it('fetches posts and updates the store', async () => {
    const expected: State = {
      ...initialState(),
      posts: {
        ...initialState().posts,
        all: {
          1: mockPost
        },
        ids: ['1'],
        loaded: true
      }
    }

    const store = createStore()
    await store.fetchPosts()

    expect(store.getState()).toEqual(expected)
  })
})
