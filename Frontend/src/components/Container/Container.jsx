export default function Container({children, width = "auto",
                                      height = "auto", justifyContent = "center"
                                      , alignItems = "center", gap = "0"}){
    return (
        <div className={`d-flex flex-column w-${width} h-${height} justify-content-${justifyContent}
         align-items-${alignItems} border border-dark-subtle rounded m-2 p-2 gap-${gap}`}>
            {children}
        </div>
    )
}