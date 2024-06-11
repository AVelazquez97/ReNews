export default function SkeletonPostCard(){
    return (
        <div className="card w-100" aria-hidden="true">
            <div className="card-body">
                <h5 className="card-title placeholder-glow">
                    <span className="placeholder col-12"></span>
                </h5>

                <p className="card-text placeholder-glow">
                    <span className="placeholder col-12 bg-success"></span>
                    <span className="placeholder col-12"></span>
                </p>
            </div>
        </div>
    )
}