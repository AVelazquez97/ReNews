export default function SkeletonUserCard() {
    return (
        <div className="card w-100 border-dark-subtle" aria-hidden="true">
            <div className="card-body">
                <h5 className="card-title placeholder-glow">
                    <span className="placeholder col-2 rounded"></span>
                </h5>

                <p className="card-text d-flex flex-column placeholder-glow gap-2">
                    <span className="placeholder col-12 rounded"></span>
                    <span className="placeholder col-4 rounded"></span>
                    <span className="placeholder col-8 rounded"></span>
                </p>

                <p className={"d-flex justify-content-between gap-1"}>
                    <span className="placeholder bg-danger col-6 rounded"></span>
                    <span className="placeholder bg-primary col-6 rounded"></span>
                </p>
            </div>
        </div>
    );
}