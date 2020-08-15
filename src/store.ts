import { reactive, readonly } from "vue"
import { Post } from "./types"

interface PostsState {
  ids: string[]
  all: Record<string, Post>
  loaded: boolean
}

interface State {
  posts: PostsState
}

const initialPostsState = (): PostsState => ({
  all: {},
  ids: [],
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

  public getState() {
    return readonly(this.state)
  }
}

const store = new Store(initialState())
store.getState()
