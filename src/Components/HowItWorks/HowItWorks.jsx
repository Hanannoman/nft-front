import React from 'react'
import './HowItWorks.css'
import Title from '../Title/Title'
import HowItWorksCard from '../HowItWorksCard/HowItWorksCard'
import walletImg from '../../assets/Images/Howitworks/SetupYourwallet.png'
import browseImg from '../../assets/Images/Howitworks/CreateCollection.png'
import earnImg from '../../assets/Images/Howitworks/StartEarning.png'

const steps = [
  { id: 1, img: walletImg, title: 'Sign Up & Connect Wallet', text: 'Create your account, then connect your digital wallet like MetaMask or Trust Wallet to access the platform securely'},
  { id: 2, img: browseImg, title: 'Browse Products',  text: 'Explore a wide range of digital products and find what suits you best' },
  { id: 3, img: earnImg, title: 'Pay with Crypto', text: 'Complete your purchase easily using cryptocurrencies like: Ton' },
]
export default function HowItWorks() {
  return (
    <section className='my-section-how-it-work-ys'>
      <div className='sec-How-it-work-ys'>
        <div className='title-how-it-work-ys'>
          <Title magic_h3={true} title={'How It Works'} paragraph={'Three Steps to Get Started'} />
        </div>
        <div className='div-cards-how-it-work-ys'>
          {steps.map((step) => (
            <HowItWorksCard
              key={step.id}
              img={step.img}
              title={step.title}
              text={step.text}
            />
          ))}
        </div>
      </div>
    </section>
  )
}