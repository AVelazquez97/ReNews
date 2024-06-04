export default function Container({children}){
    return (
        <div className={"d-flex flex-column w-50 justify-content-center align-items-center border border-dark-subtle rounded m-2 p-2"}>
            {children}
        </div>
    )
}