export default function Spinner({}) {
    return (
        <div
            className={"position-absolute top-0 w-100 h-100 d-flex justify-content-center align-items-center opacity-25 bg-dark"} style={{zIndex: 9999}}>
            <div className="spinner-border text-primary"></div>
        </div>
    );
}