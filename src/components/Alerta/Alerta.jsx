
import Styles from "../Alerta/Alerta.module.css"

const Alerta = ({ show, message, onClose }) => {
  if (!show) return null;

  return (
    
    <div class={Styles.Area}>
      <div class={Styles.Alerta}>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Alerta;   