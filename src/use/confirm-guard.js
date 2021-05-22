import { onBeforeRouteLeave, useRouter } from 'vue-router'
import { ref } from 'vue'

export function useConfirmGuard(changed) {
  const leave = ref(false)
  const canLeave = ref(false)
  const toLeave = ref('')
  const router = useRouter()

  const navigate = () => {
    leave.value = false
    canLeave.value = true
    router.push(toLeave.value)
  }

  onBeforeRouteLeave(to => {
    console.log(changed.value)
    toLeave.value = to.path

    if (canLeave.value) {
      return true
    }

    if (changed.value) {
      leave.value = true
      return false
    }

    return true
  })

  return {
    leave,
    navigate,
  }
}
