import { Link } from "react-router";

export function TestInner() {
    return (
        <div className="container min-page-height">
            <h1>This is inner page of testing</h1>
            <Link className="btn btn-success" to='/'>Go home</Link>
        
        </div>

    )
}