import React, { useState, useRef } from 'react'
import { useIntersection } from '../IntersectionObserver';

const Picture = (props) => {
    const [isInView, setIsInView] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false)
    const imgRef = useRef()
    const data = props.data
    console.log(data)

    useIntersection(imgRef, () => {
      setIsInView('true')
    });

    return (
      <div 
        className='pic-wrapper'
        ref={imgRef}
      >
        {isInView && (
          <>
            <img className={`thumb ${isLoaded ? 'isLoaded' : ''}`} 
              src={data.urls.thumb}
              alt={data.description}
            />

            <img className={`pic ${isLoaded ? 'isLoaded' : ''}`} 
            src={data.urls.small} 
            alt={data.description}
            onLoad={() => setIsLoaded(true)}/>
          </>
        )} 

        <div className='overlay'>
          <a href={data.urls.raw} className='btn download'>Download</a>
          <div className='info'>
            <h2>{data.user.name}</h2>
            <p>{data.description}</p>
          </div>
        </div> 
      </div>
    )
}

export default Picture;