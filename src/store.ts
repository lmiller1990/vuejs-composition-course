import { reactive, readonly, provide, inject } from "vue"
import axios from 'axios'
import { Post, User } from "./types"

interface Author {
  id: number
  username: string
}

interface AuthorsState {
  ids: string[]
  all: Record<string, Author>
  loaded: boolean
  currentUserId?: string
}

interface PostsState {
  ids: string[]
  all: Record<string, Post>
  loaded: boolean
}

interface State {
  authors: AuthorsState
  posts: PostsState
}


const initialAuthorsState = (): AuthorsState => ({
  all: {},
  ids: [],
  loaded: false
})

const initialPostsState = (): PostsState => ({
  all: {},
  ids: [],
  loaded: false
})

const initialState = (): State => ({
  posts: initialPostsState(),
  authors: initialAuthorsState(),
})

class Store {
  protected state: State

  constructor(initialState: State) {
    this.state = reactive(initialState)
  }

  public getState(): State {
    return readonly(this.state)
  }

  async createUser(user: User) {
    const response = await axios.post<Author>('/users', user)
    this.state.authors.all[response.data.id] = response.data
    this.state.authors.ids.push(response.data.id.toString())
    this.state.authors.currentUserId = response.data.id.toString()
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

export const store = new Store(initialState())
store.getState()

export const provideStore = () => {
  provide('store', store)
}

export const createStore = () => {
  return new Store(initialState())
}

export const useStore = (): Store => {
  const store = inject<Store>('store')
  return store
}
