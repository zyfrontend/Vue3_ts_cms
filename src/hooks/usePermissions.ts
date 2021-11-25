import { useStore } from '@/store'
export function usePermissions(pageName: string, handleName: string) {
  const store = useStore()
  const permissions = store.state.login.permissions
  const verifyPermissions = `system:${pageName}:${handleName}`
  return !!permissions.find((item) => item === verifyPermissions)
}
