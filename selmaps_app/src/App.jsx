import Map from './components/Map'
import SideBar from './components/SideBar';
import './styles/App.css'
import 'mapbox-gl/dist/mapbox-gl.css';

function App() {
  return (
    <>
      <SideBar/>
      <Map/>
    </>
  )
}

export default App
