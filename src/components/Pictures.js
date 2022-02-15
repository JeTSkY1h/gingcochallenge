import React from "react"
import Picture from "./Picture"

const Pictures = (props) => {
    const data = props.data
    console.log(data)
    return (
        <div className='pic-flex'>
            {data.map((pic,i)=>{
                console.log(pic)
            return <Picture data={pic} key={i}/>
            })}
        </div>
    )
}

export default Pictures;