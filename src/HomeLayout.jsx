import { Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer/Footer';
import './App.css';

const DashboardLayout = ({ children, ...rest }) => {
    return (
        <div>
            <Navbar />
            {children}
            <Footer id='footer'></Footer>
        </div>
    )
};

const DashboardLayoutRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) => (
          <DashboardLayout>
            <Component {...props} />
          </DashboardLayout>
        )}
      />
    );
  };
  
  export default DashboardLayoutRoute;