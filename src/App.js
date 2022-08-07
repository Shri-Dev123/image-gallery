import axios from "axios";
import { useEffect, useState } from "react";
import "./assets/main.css"
import ImageCard from "./components/ImageCard"
import SearchBar from "./components/SearchBar"
function App() {
  const [images,setImages] = useState([]);
  const [loading,setIsLoading] = useState(true);
  const [searchTerm,setSearchTerm] = useState("")

  useEffect(()=>{
      (async () => {
        
       const fetchedData =  await axios.get(`https://pixabay.com/api/?key=29049908-f3f31ac74e59aac1a785bb1ec&q=${searchTerm}&image_type=photo&pretty=true`)
        setIsLoading(false)
        setImages(fetchedData.data.hits)
        
      })();
      
  },[searchTerm])

  return (
    <div className="container mx-auto" >
      <SearchBar searchText={(text)=>setSearchTerm(text)} />
        {!loading && images.length === 0 && <h1 className="text-5xl text-center mx-auto grid-cols-1">no images found</h1>}
      <div className="grid grid-cols-3 gap-4">
     {loading ? <h1 className="text-3xl text-center mx-auto" >loading....</h1>:images.map(image => (<ImageCard image={image} key={image.id}/>))} 

    
      </div>
    </div>);
}
export default App