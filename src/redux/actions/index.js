export const USER_EMAIL = 'USER_EMAIL';

export const getMail = (email) => ({
  type: USER_EMAIL,
  payload: {
    email,
  },
});
