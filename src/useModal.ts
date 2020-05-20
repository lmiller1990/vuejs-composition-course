
import { ref, readonly } from 'vue'

const visible = ref(false)

export function useModal() {
  return {
    visible: readonly(visible),
    showModal: () => visible.value = true,
    hideModal: () => visible.value = false,
  }
}
