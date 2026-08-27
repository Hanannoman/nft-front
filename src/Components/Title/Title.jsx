
import './Title.css'
export default function Title({ title,myIcon, paragraph, showButton, buttonText, showInput, inputPlaceholder, onInputChange, iconInput ,magic_h3  , onButtonClick}) {
  return (
    <div className="ED-title">
      <div className="text-content">
        <h3 className={magic_h3 ? 'mh-Magic-h3' :'mh-title'}>{title}</h3>
        <p>{paragraph}</p>
        {showInput && (
          <input
            type="text"
            className="title-input"
            placeholder={inputPlaceholder || "Enter text..."}
            onChange={onInputChange}
            icon={iconInput}
          />
        )}
      </div>
      {showButton && (
        <button className="title-button" onClick={onButtonClick}>
          <img src={myIcon}></img>
          {buttonText}
          </button>)}
    </div>
  )
}
