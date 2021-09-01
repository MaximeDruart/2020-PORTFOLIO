import React from "react"

const PGItem = (props) => {
  return (
    <div className="playground-item">
      <div className="left">
        <div className="img-container">
          <img src={props.img} alt="" />
        </div>
      </div>
      <div className="right">
        <div className="title">{props.title}</div>
        <div className="description">{props.description}</div>
        {props.link && (
          <a target="_blank" rel="noopener noreferrer" href={props.link} className="link">
            Visit site
          </a>
        )}
        <a target="_blank" rel="noopener noreferrer" href={props.github} className="link github">
          See code on github
        </a>
      </div>
    </div>
  )
}

export default PGItem
