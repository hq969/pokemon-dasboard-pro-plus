import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../../lib/date'

const Default = ({ text }: { text: string }) => {
    useDocumentTitle('404 Page')
    return (
        <div style={{ maxWidth: "700px" }} data-testid="header404" className='card d-flex w-100 justify-content-center align-items-center mx-auto my-5 p-5'>
            <h1 className='alert alert-danger' aria-label="You Lost" data-toggle="tooltip" data-placement="top" title="You Lost">{text}</h1>
            <p title='Suggestions' className='alert alert-info'>Use navigation bar to Get Back to home</p>
            <Link to="/" className="btn btn-info" aria-label="Go to Home" data-toggle="tooltip" data-placement="top" title="Go to Home">Or Just click me</Link>
        </div>
    )
}

export default Default
