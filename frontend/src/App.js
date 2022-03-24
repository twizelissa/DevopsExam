import "./App.css";
import { Link, Route, Routes } from 'react-router-dom'
import BuyElectricity from "./pages/BuyElectricty";
import LoadElectricty from "./pages/LoadElectricty";
import Check from "./pages/Check";

const Home = () => {
    return <div>
        <h2>Welcome to electricity selling app</h2>

    </div>
}

const NotFound = () => (
    <div>
        <h1 className="text-6xl font-bold text-purple-800">404 - Not found</h1>
    </div>
)


function App() {

    return (
        <div>
            <div className="flex px-12 py-5 shadow-lg">
                <div className="px-4 cursor-pointer hover:underline"><Link to="/"> HOME </Link></div>
                <div className="px-4 cursor-pointer hover:underline"><Link to="/electricity/buy"> BUY UNITS </Link></div>
                <div className="px-4 cursor-pointer hover:underline"><Link to="/electricity/load"> LOAD ELECTRICY </Link></div>
                <div className="px-4 cursor-pointer hover:underline"><Link to="/electricity/check"> CHECK UNITS</Link></div>
            </div>
            <div className="h-[90vh] flex justify-center items-center">
                <Routes>
                    <Route path="/" exact element={<Home />}> </Route>
                    <Route path="/electricity/buy" element={<BuyElectricity />}> </Route>
                    <Route path="/electricity/load" element={<LoadElectricty />}> </Route>
                    <Route path="/electricity/check" element={<Check />}> </Route>
                    <Route path="*" element={<NotFound />}>nooo</Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;
