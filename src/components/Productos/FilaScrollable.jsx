import { useRef } from "react";
import styles from "./FilaScrollable.module.css";

export default function FilaScrollable({ children }) {
  const rowRef = useRef(null);
  const scrollAmount = 320;

  const scrollRight = () => {
    const row = rowRef.current;
    if (!row) return;

    if (row.scrollLeft + row.clientWidth >= row.scrollWidth - 5) {
      row.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      row.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    const row = rowRef.current;
    if (!row) return;

    if (row.scrollLeft <= 5) {
      row.scrollTo({ left: row.scrollWidth, behavior: "smooth" });
    } else {
      row.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className={styles.wrap}>
      <button className={styles.btnLeft} onClick={scrollLeft}>
        <i className="bi bi-chevron-left"></i>
      </button>

      <div ref={rowRef} className={styles.row}>
        {children}
      </div>

      <button className={styles.btnRight} onClick={scrollRight}>
        <i className="bi bi-chevron-right"></i>
      </button>
    </div>
  );
}
