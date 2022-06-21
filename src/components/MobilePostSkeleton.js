import '../styles/MobilePostSkeleton.css'

function MobilePostSkeleton() {
    return (
    <div className="MobilePostSkeleton">
        <div className="MobilePostSkeleton__Header">
            <div className="MobilePostSkeleton__Icon" />
            <div className="MobilePostSkeleton__User">
                <div className="MobilePostSkeleton__Name" />
                <div className="MobilePostSkeleton__Time" />
            </div>
        </div>
        <div className="MobilePostSkeleton__Image" />
        <div className="MobilePostSkeleton__Caption" />
        <div className="MobilePostSkeleton__Caption__Line2" />
        <div className="MobilePostSkeleton__Caption__Line3" />
    </div>
    )
}

export default MobilePostSkeleton