export const signin = (token) => {
  sessionStorage.setItem('jwt', token);
}
export const signout = () => {
  sessionStorage.removeItem('jwt');
}
export const getToken = () =>
  sessionStorage.getItem('jwt');

export const isSignedIn = () => !!sessionStorage.jwt;
// export const userSignedOut = (token) => {
//   sessionStorage.removeItem('jwt');
// }
