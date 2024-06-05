import styles from "./ImageCard.module.css";
export default function ImageCard({title, description, imgPath = false}){
    return (
        <div className={`card ${styles['imageCard-custom']} style={{width: "18rem"}`}>
            <img src={imgPath} className="card-img-top"/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
            </div>
        </div>
    )
}