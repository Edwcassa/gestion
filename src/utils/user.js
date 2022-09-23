export const getUser = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user)
    return user
  return null
}

export const setUserLocal = (userJson) => {
  localStorage.setItem('user', JSON.stringify(userJson))
}

export const deleteUserLocal = () => {
  localStorage.removeItem('user')
}