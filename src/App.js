import './App.css';
import Pictures from './components/Pictures'
import React, {useEffect, useState} from 'react';
import Header from './components/Header'
const API_URL = 'https://api.unsplash.com/photos/'

const App = (props) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1);
  
  useEffect( ()=> {
    const loadPictures = async() => {
      try {
        setIsLoading(true);
        const res = await fetch(`${API_URL}?page=${page}&per_page=9&client_id=${process.env.REACT_APP_API_KEY}`);
        const resData = await res.json()
        setData((data)=>data.concat(resData))
      }
      catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false);
      }
    };

    loadPictures();
  },[page])

  const loadMore = () => {
    setPage((page)=> page + 1)
  }

  return (
    <div className='container'>
      <Header />
      {process.env.REACT_APP_API_KEY ?
        <>
          <Pictures data={data}/> 
          <button onClick={loadMore} 
          className='btn more'>{isLoading ? 'Loading..' : 'Load More'}</button> 
        </>
      :
        <> 
          <h1>Missing API Key</h1>
          <p>Did you create a .env file?</p>
        </>
      }
      
    </div>
  )
}

export default App;
