import react from "react";
import styles from "./Card.module.css";
export default function Card ({ title, description, imgPath = false, imgWidth = "100px",  onClick = () => {}, textAlign = "start"}) {
    return (
        <div className={`card d-flex h-100 ${styles['card-custom']} text-${textAlign}`} onClick={onClick}>
            <div className="card-body">
                {imgPath && <img src={imgPath} width={imgWidth}/>}
                <h5 className={"text-primary fw-semibold"}>{title}</h5>
                <p className="card-text">{description}</p>
            </div>
        </div>
    )
}