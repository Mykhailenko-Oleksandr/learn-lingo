import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/lib/store/authStore";
import { onAuthStateChanged } from "firebase/auth";

export function initAuthListener() {
  const { setUser, clearIsAuthenticated } = useAuthStore.getState();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser({
        id: user.uid,
        email: user.email!,
        refreshToken: user.refreshToken,
      });
    } else {
      clearIsAuthenticated();
    }
  });
}
