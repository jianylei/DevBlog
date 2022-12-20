import { Link } from "react-router-dom"

const LayoutHeader = () => {
  return (
    <header className="main-header">
        <div className="main-header__container">
            <Link to='/'>
                <h1 className="main-header__title">simpleBlog</h1>
            </Link>
            <nav className="main-header__nav">
                <Link>blog</Link>
                <Link>about</Link>
                <Link>account</Link>
            </nav>
        </div>
    </header>
  )
}

export default LayoutHeader