import React from 'react'
import './SocialMediaLink.css';
import DiscordLogo from './../../assets/Images/icons/DiscordLogo.svg'
import YoutubeLogo from './../../assets/Images/icons/YoutubeLogo.svg'
import TwitterLogo from './../../assets/Images/icons/TwitterLogo.svg'
import InstagramLogo from './../../assets/Images/icons/InstagramLogo.svg'

export default function SocialMediaLink({ ysShowLink }) {
  return (
    <>
      <ul className='ys-myul'>
        {ysShowLink && (
          <li>
            <a href='https://www.animaapp.com'>
              <img src="../../../public/Images/icons/Globe.svg" className={!ysShowLink ? 'ys-myicon-web-li-a-none' : 'ys-myicon-li-a'} />
            </a>
          </li>
        )}
        <li><a href='https://discord.com/invite/eQxkYTNxSp'><img src={DiscordLogo} className={!ysShowLink ? '' : 'ys-myicon-li-a'} /></a></li>
        <li><a href='https://www.youtube.com/channel/UCXqr0Ca-b73rU9zcpSBJ5cw'><img src={YoutubeLogo} className={!ysShowLink ? '' : 'ys-myicon-li-a'} /></a></li>
        <li><a href='https://twitter.com/animaapp?lang=en'><img src= {TwitterLogo} className={!ysShowLink ? '' : 'ys-myicon-li-a'} /></a></li>
        <li><a href='https://www.instagram.com/animaapp/?hl=en'><img src={InstagramLogo} className={!ysShowLink ? '' : 'ys-myicon-li-a'} /></a></li>
      </ul>
    </>
  )
}
