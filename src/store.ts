import { reactive, readonly } from "vue"
import axios from 'axios'
import { Post } from "./types"

interface PostsState {
  ids: string[]
  all: Record<string, Post>
  loaded: boolean
}

interface State {
  posts: PostsState
}

import { todayPost, thisWeek, thisMonth } from './mocks'

const initialPostsState = (): PostsState => ({
  all: {
  },
  ids: [
  ],
  loaded: false
})

const initialState = (): State => ({
  posts: initialPostsState()
})

class Store {
  protected state: State

  constructor(initialState: State) {
    this.state = reactive(initialState)
  }

  public getState(): State {
    return readonly(this.state)
  }

  async createPost(post: Post) {
    const response = await axios.post<Post>('/posts', post)
    this.state.posts.all[response.data.id] = response.data
    this.state.posts.ids.push(response.data.id.toString())
  }

  async fetchPosts() {
    const response = await axios.get<Post[]>('/posts')
    for (const post of response.data) {
      if (!this.state.posts.ids.includes(post.id.toString())) {
        this.state.posts.ids.push(post.id.toString())
      }

      this.state.posts.all[post.id] = post
    }

    this.state.posts.loaded = true
  }
}

const store = new Store(initialState())
store.getState()

export const useStore = () => store
