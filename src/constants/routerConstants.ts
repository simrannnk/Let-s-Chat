export const appRoutes = {
  All: '/*',
  SIGNUP: '/auth/signup',
}

export const unprotectedRoutes = [appRoutes.SIGNUP, appRoutes.All]
