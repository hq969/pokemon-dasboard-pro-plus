const Error = ({ error, data }) => (
    <div className='container'>
        <div title='Error' className='alert alert-danger'>
            {error}
            {(()=>{
                try{
                    return error.includes('404') ? `${data} not found`: ''
                }catch (e) {
                    return e.massage
                }
            })()}
        </div>
    </div>
)


export default Error