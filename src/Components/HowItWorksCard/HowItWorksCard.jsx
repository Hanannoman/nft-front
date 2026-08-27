import React from 'react'
import './HowItWorksCard.css'

export default function HowItWorksCard({ img, title, text }) {
  return (
    <div className='how-it-work-card-ys'>
      <img src={img} alt={title} />
      <div className='how-it-work-div-card-ys'>
        <h5 className='how-it-work-div-card-ys-h5'>{title}</h5>
        <p className='how-it-work-div-card-ys-p'>{text}</p>
      </div>
    </div>
  )
}