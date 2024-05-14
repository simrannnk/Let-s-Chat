import { appRoutes, unprotectedRoutes } from "constants/routerConstants";
import { useRecoilValue } from "recoil";
import { FC, useEffect } from "react";
import User, { UserToken } from "atom/user";
const isBrowser = () => typeof window !== "undefined";

const ProtectedRoute: FC<{ router: any; children: any }> = ({
  router,
  children,
}) => {
  //Identify authenticated user
  const user = useRecoilValue(User);
  // const tokens = useRecoilValue(UserToken);
  const isAuthenticated = Boolean(user);

  useEffect(() => {
    if (!user) {
    }
  }, [user]);
  /**
   * @var pathIsProtected Checks if path exists in the unprotectedRoutes routes array
   */
  let pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;
  // if (pathIsProtected && isBrowser() && !isAuthenticated) {
  //   router.push(appRoutes.SIGNUP);

  //   return <></>;
  // }
  return children;
};

export default ProtectedRoute;
