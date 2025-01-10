import Navbar from './Navbar';
import Footer from './Footer';
import { WithChildren } from '../types';

function Layout({ children }: WithChildren) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    );
}

export default Layout
