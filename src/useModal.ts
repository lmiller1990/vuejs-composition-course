
import { ref, readonly, reactive, shallowRef, markRaw } from 'vue'

const visible = ref(false)
const component = ref()

export function useModal() {
  return {
    component,
    visible: readonly(visible),
    showModal: () => visible.value = true,
    hideModal: () => visible.value = false,
  }
}
