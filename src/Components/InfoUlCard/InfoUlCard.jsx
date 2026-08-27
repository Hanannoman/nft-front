import React from 'react'
import './InfoUlCard.css'

export default function InfoUlCard({data}) {
  return (
    <ul className='mh_ul_infoUL'>
    {data.map((item, index) => (
      <li key={index} className='mh_li_infoUL'>
        <h4 className='mh_h4_infoUL'>{item.value}</h4>
        <p className='mh_p_infoUL'>{item.label}</p>
      </li>
    ))}
  </ul>
  )
}

