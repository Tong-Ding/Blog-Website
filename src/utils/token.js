// 封装ls存取token

const TOKEN_KEY = 'geek_pc'
// 箭头函数本身有返回值
const getToken = () => window.localStorage.getItem(TOKEN_KEY)
const setToken = (token) => window.localStorage.setItem(TOKEN_KEY, token)
const removeToken = () => window.localStorage.removeItem(TOKEN_KEY)

export { getToken, setToken, removeToken }