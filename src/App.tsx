import {Routes, Route} from "react-router-dom"
import './scss/app.scss'

import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Cart from "./pages/Cart"
import FullPizza from "./pages/fullPizza"
import MainLayout from "./layouts/MainLayout"

function App() {

    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<MainLayout/>}>
                    <Route path='' element={<Home/>}> </Route>
                    <Route path='pizza/:id' element={<FullPizza/>}> </Route>
                    <Route path='cart' element={<Cart/>}> </Route>
                    <Route path='*' element={<NotFound/>}> </Route>
                </Route>
            </Routes>
        </div>
    )
}

export default App
