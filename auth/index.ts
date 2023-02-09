import { useEffect, useState } from "react"

const TOKEN = '_token';

const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<null | boolean>(null)
  useEffect(() => {
    if (window?.localStorage.getItem(TOKEN)) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  return isLoggedIn
}

export { useIsLoggedIn, TOKEN }
