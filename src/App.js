

import {BrowserRouter , Routes , Route} from "react-router-dom"
import Home from "./Components/Home";
import Search from "./Components/Search";



const App =  ()=>{
 
  return (
    <>
    <BrowserRouter>
  
    <Routes>
      {/* <Route path="/" element={<UploadCard/>}/> */}
      <Route path="/" element={<Home/>}/>
      <Route path="/search" element={<Search/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
