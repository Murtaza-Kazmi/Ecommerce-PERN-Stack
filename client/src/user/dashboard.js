import React, { Fragment} from 'react';
import {Link} from 'react-router-dom';
import Layout from '../core/Layout';
//This is the dashboard that links to all admin functions
const Dashboard = () => {

const links = () => {
  return(
        <Fragment>
          <h1 className="mt-5 text-center">Admin Functions</h1>
                <div>
                    <li>
                        <Link
                            className='nav-link'
                            to='/Product'>Add Product
                        </Link>
                    </li>
                    <li>
                        <Link
                            className='nav-link'
                            to='/Category'>Add Category
                        </Link>
                    </li>
                    <li>
                        <Link
                            className='nav-link'
                            to='/User'>Add User
                        </Link>
                    </li>
                </div>

        </Fragment>
    );
  }
  return(
        <Layout
            title='Dashboard'
            description={`Hello!`}
            className='container-fluid'>
                <div className='row'>
                    <div className='col-3'>
                        {links()}
                    </div>
                </div>
        </Layout>
    );
}
export default Dashboard;
