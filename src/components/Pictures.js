import React from "react"
import Picture from "./Picture"

const Pictures = (props) => {
    const data = props.data
    return (
        <div className='pic-flex'>
            {data.map((pic,i)=>{
            return <Picture data={pic} key={i}/>
            })}
        </div>
    )
}

export default Pictures;