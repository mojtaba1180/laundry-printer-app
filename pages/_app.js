
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';
import Sidebar from './../layout/sidebar/index';
function MyApp({ Component, pageProps }) {
  return (
    <div className="flex  h-screen bg-white/20 ">
      <Toaster />
      <div className="w-[250px] h-full bg-gray-300/40  ">
        <Sidebar />
      </div>
      <div className="w-[80%] h-full p-0 relative" >
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp