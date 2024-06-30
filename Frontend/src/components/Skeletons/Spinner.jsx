export default function Spinner({fullscreen}) {
    return (
        fullscreen ?
            <div
                className={"position-absolute top-0 w-100 h-100 d-flex justify-content-center align-items-center opacity-25 bg-dark"}>
                <div className="spinner-border text-primary"></div>
            </div>
            :
            <div
                className={"position-absolute top-0 w-100 h-100 d-flex justify-content-center align-items-center opacity-25 bg-dark"}>
                <div className="spinner-border text-primary"></div>
            </div>
    );
}