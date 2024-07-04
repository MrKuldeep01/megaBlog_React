import config from '../config/envconfig';
import './App.css'


function App() {
  console.log(config.appwriteUrl);

  return (
    <>
    <h1 className='bg-rose-600 text-white text-center p-4 font-semibold rounded'>hello my dear ...</h1>
    </>
  )
}

export default App
