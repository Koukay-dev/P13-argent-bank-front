export const getToken = (state) => state?.auth?.token 
export const getFirstname = (state) => state?.user?.firstname 
export const getLastname = (state) => state?.user?.lastname 
export const getFullname = (state) => getFirstname(state) + ' ' + getLastname(state)