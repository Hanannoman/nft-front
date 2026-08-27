
import './Hero.css'
import ButtonBh from './../ButtonBh/ButtonBh'
import InfoUlCard from '../InfoUlCard/InfoUlCard'
import data from './../../data/InfoUlCard'
import { Link } from 'react-router'
import heroGif from '../../assets/Images/heroanimationtransparentbck-2.gif'
import rocketIcon from '../../assets/Images/icons/RocketLaunch.svg'
import { FaGem } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function Hero() {
  const handleShowTonPrice = async () => {
    try {
      const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd');
      const data = await res.json();
      const price = data['the-open-network']?.usd;
      toast.info(` 1 TON = $${price} USD`, { autoClose: 4000 });
    } catch {
      toast.error("Couldn't fetch TON price");
    }
  };

  return (
    <section className='bh-hero'>
      <div className='bh-hero-father'>
            <div className='bh-left-part-hero'>
    <h1>Buy, Sell & Discover Rare Digital Art</h1>
    <p className='bh-left-part-hero-p'>The ultimate NFT marketplace where creators and collectors meet. Explore thousands of unique digital assets and start your collection today.</p>
    <img className='bh-img-sm-screen' src={heroGif} alt="hero" />

    <Link to={"/create-account"}>
      <ButtonBh buttonText={"Get Started"} buttonIcon={rocketIcon} buttonClass={"bh-button-one bh-hero-button"} showIcon={true} />
    </Link>

    <div className='bh-hero-info-ul'>
      <InfoUlCard data={data.dataList1} />
    </div>
  </div>
  <img className='bh-hero-img-lg-md-screen' src={heroGif} alt="hero" />

  <button onClick={handleShowTonPrice} className="bh-hero-ton-corner-btn">
    <FaGem /> TON vs Dollar
  </button>
</div>
    </section>
  )
}