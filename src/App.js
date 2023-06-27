// 导入路由
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import GeekLayout from './pages/Layout'
import Home from './pages/Home'
import Article from './pages/Article'
import Publish from './pages/Publish'
import { HistoryRouter, history } from './utils/history'
import { AuthComponent } from './components/AuthComponent'

function App () {
  return (
    <HistoryRouter history={history}>
      <div className="App">
        <Routes>
          <Route path='/' element={
            <AuthComponent>
              <GeekLayout />
            </AuthComponent>
          }>
            {/* 二级路由默认页面 */}
            <Route index element={<Home />} />
            <Route path="article" element={<Article />} />
            <Route path="publish" element={<Publish />} />
          </Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </div>
    </HistoryRouter>
  )
}

export default App
