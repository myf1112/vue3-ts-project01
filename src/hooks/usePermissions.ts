import { useStore } from '@/store';
export function usePermissions(pageName: string, handleName: string) {
  const store = useStore();

  const verifyName = `system:${pageName}:${handleName}`;
  const permissions = store.state.loginModule.permissions;
  return !!permissions.find((item) => {
    return item === verifyName;
  });
}
