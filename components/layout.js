import Header from "./header";
import Footer from "./footer";
import Navbar from "./navbar";

const Layout = ({ children }) => {
  return (
    <div className="content">
      <Header />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
