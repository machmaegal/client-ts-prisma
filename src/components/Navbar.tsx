import { Link } from 'react-router-dom';
import burgerMenu from '/burger-menu-icon.png'


function Navbar() {
    return (
        <nav>
            <div id='nav-menu-container'>
                <Link to='/' className='internal-link' >Home</Link>
                <Link to='/' className='internal-link' >Recipes</Link>
            </div>

            <img id='burger-menu-icon' src={burgerMenu} />
        </nav>
    )
}

export default Navbar
