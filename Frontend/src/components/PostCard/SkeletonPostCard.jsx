export default function SkeletonPostCard(){
    return (
        <div className="card w-100" aria-hidden="true">
            <div className="card-body">
                <h5 className="card-title placeholder-glow">
                    <span className="placeholder col-12 rounded"></span>
                </h5>

                <p className="card-text text-start placeholder-glow">
                    <span className="placeholder col-6 bg-success rounded"></span>
                    <span className="placeholder col-12 rounded"></span>
                    <span className="placeholder col-6 rounded"></span>
                    <span className="placeholder col-10 rounded"></span>
                </p>
            </div>
        </div>
    )
}