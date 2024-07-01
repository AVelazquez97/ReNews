export default function SkeletonProfileInfo(){
    return (
        <div className="card w-100 border-dark-subtle" aria-hidden="true">
            <div className="card-body">
                <p className="card-text d-flex flex-column justify-content-center align-items-center placeholder-glow gap-2">
                    <span className="placeholder col-4 rounded"></span>
                    <span className="placeholder col-3 rounded"></span>
                    <span className="placeholder col-6 rounded"></span>
                    <span className="placeholder col-3 rounded"></span>
                    <span className="placeholder col-6 rounded"></span>
                    <span className="placeholder col-3 rounded"></span>
                    <span className="placeholder col-6 rounded"></span>
                    <span className="placeholder col-3 rounded"></span>
                    <span className="placeholder col-6 rounded"></span>
                </p>
            </div>
        </div>
    )
}