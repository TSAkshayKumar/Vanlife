import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './index.css';
import "./server"
import Layout from './Component/Layout';
import Home from './Pages/Home';
import About from './Pages/About';
import Van, { loader as vanLoader } from './Pages/Van/Van';
import Login, { loader as loginLoader, action as loginAction, loader } from './Pages/Login';
import VanDetails, { loader as vanDetailsLoader } from './Pages/Van/VanDetails';
import HostLayout from './Component/HostLayout';
import DashBoard, { loader as dashBoardLoader } from './Pages/Host/DashBoard';
import Income from './Pages/Host/Income';
import HostVansDetailsLayout, { loader as hostVansDetailsLoader } from './Component/HostVanDetailsLayout';
import Review from './Pages/Host/Review';
import HostVans, { loader as hostVansLoader } from './Pages/Host/HostVans';
import SpecVanDetails from './Pages/Host/SpecificVanDetails/SpecVanDetails';
import SpecVanPrice from './Pages/Host/SpecificVanDetails/SpecVanPrice';
import SpecVanPhotos from './Pages/Host/SpecificVanDetails/SpecVanPhotos';
import NotFound from './Pages/NotFound';
import { authorizeUser } from './utils/authorizeUser';

const rootRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path='about' element={<About />} />
      <Route
        path='vans'
        element={<Van />}
        loader={vanLoader}
      />
      <Route
        path='login'
        element={<Login />}
        loader={loginLoader}
        action={loginAction}
      />
      <Route
        path='vans/:id'
        element={<VanDetails />}
        loader={vanDetailsLoader}
      />
      <Route path='host' element={<HostLayout />}>
        <Route
          index
          element={<DashBoard />}
          loader={dashBoardLoader}
        />
        <Route
          path='income'
          element={<Income />}
          loader={async ({request}) => await authorizeUser(request)}
        />
        <Route
          path='review'
          element={<Review />}
          loader={async ({request}) => await authorizeUser(request)}
        />
        <Route
          path='vans'
          element={<HostVans />}
          loader={hostVansLoader}
        />
        <Route
          path='vans/:id'
          element={<HostVansDetailsLayout />}
          loader={hostVansDetailsLoader}
        >
          <Route
            index
            element={<SpecVanDetails />}
          />
          <Route
            path='pricing'
            element={<SpecVanPrice />}
            loader={async ({request}) => await authorizeUser(request)}
          />
          <Route
            path='photos'
            element={<SpecVanPhotos />}
            loader={async ({request}) => await authorizeUser(request)}
          />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
)
const App = () => {
  return (
    < RouterProvider router={rootRouter} />
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();