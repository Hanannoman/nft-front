import './ButtonBh.css'

export default function ButtonBh({ showIcon, buttonText, buttonClass, buttonIcon, onClick }) {
  return (
    <>
      <button className={buttonClass} onClick={onClick}>
        {showIcon && <img src={buttonIcon} className="bh-button-icon" />}
        <p className='button-text'>{buttonText}</p>
      </button>
    </>
  )
}
