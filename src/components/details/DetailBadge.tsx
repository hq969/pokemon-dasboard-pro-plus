const Badges = ({ arr, property }: { arr: string[], property: string }) => (
    <>
        <b>{property}</b>
        {" "}
        {arr.length ? arr.map((item: string) => <span key={item} title={`property`} className='badge bg-secondary mx-1 text-capitalize'>{item}</span>) : "No " + property.toLowerCase() + " available"}
    </>
)

export default Badges