import './ButtonTitleResponsive.css'

export default function ButtonTitleResponsive({ myButtonText, icon, onClick }) {
  return (
    <button className="ys-btn-responsive-title" onClick={onClick}>
      <img src={icon} />
      {myButtonText}
    </button>
  );
}
