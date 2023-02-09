import { useEffect, useState } from "react"

const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<null | boolean>(null)
  useEffect(() => {
    if (window?.localStorage.getItem("auth")) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  return isLoggedIn
}

export { useIsLoggedIn }
