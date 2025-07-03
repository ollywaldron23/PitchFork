// components/Layout.jsx
import Navbar from './Navbar';
import '../styles/components/Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout-wrapper">
      <Navbar />
      <main className="main-view">
        {children}
      </main>
    </div>
  );
};

export default Layout;
