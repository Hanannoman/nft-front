import './Footer.css'
import SocialMediaLink from '../SocialMediaLink/SocialMediaLink';
import Logo from "../../assets/Images/Logo.png"

export default function Footer() {
  return (
    <div className='mh-footer'>
      <div className='mh-footer-part1'>
        <div className='mh-footer-part1-1'>
          <img className='mh-img-part1-1' src={Logo} alt="logo" />
          <div className='mh-div-part1-1'>
            <p className='mh-p-part1-1'>NFT marketplace UI created with Anima for Figma.</p>
            <div className='mh-div2-part1-1'>
              <span className='mh-span-part1-1'>Join our community</span>
              <SocialMediaLink/>
            </div>
          </div>
        </div>
        <div className='mh-footer-part1-2'>
          <h5 className='mh-h5-part1-2'>Explore</h5>
          <ul className='mh-ul-part1-2'>
            <li className='mh-li-part1-2 mh-Marketplace'>Marketplace</li>
            <li className='mh-li-part1-2 mh-Rankings'>Nfts</li>
            <li className='mh-li-part1-2 mh-ConnectAWallet'>Connect a wallet</li>
          </ul>
        </div>
        <div className='mh-footer-part1-3'>
          <h5 className='mh-h5-part1-3'>Join our weekly digest</h5>
          <div className='mh-div-part1-3'>
            <p className='mh-p-part1-3'>Get exclusive promotions & updates straight to your inbox.</p>
          </div>
        </div>
      </div>
      <div className='mh-footer-part2'>
        <div></div>
        <p className='mh-p-part2'>Ⓒ NFT Market. Use this template freely.</p>
      </div>
    </div>
  )
}
