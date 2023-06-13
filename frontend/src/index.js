import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; 
import  {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import ProductScreen from './screens/Productscreen';
import store from './store.js';
import { Provider } from 'react-redux';
import CartScreen from './screens/cartscreen';
import LoginScreen from './screens/loginscreen';
import RegisterScreen from './screens/registerscreen';
import ShippingScreen from './screens/shippingscreen';
import SecureRoute from './checkshippingroute';
import Homescreen from './screens/Homescreen';
import PaymentScreen from './screens/paymentscreen';
import PlaceOrder from './screens/placeorder';
import ProfileScreen from './screens/profilescreen';
import OrderScreen from './screens/orderscreen';
import AdminRoute from './components/adminroute';
import OrderListScreen from './screens/orderlistscreen';
import ProductListScreen from './screens/Productlistscreen';
import ProductEditScreen from './screens/ProducteditScreen';

const router = createBrowserRouter(
  createRoutesFromElements(

  <Route path='/' element={<App/>}>
    <Route path='/' element={<Homescreen/>}/>
    <Route path='/search/:keyword' element={<Homescreen/>}/>
    <Route path="/product/:id" element={<ProductScreen/>}/>
    <Route path="/cart" element={<CartScreen/>}/>
    <Route path="/login" element={<LoginScreen/>}/>
    <Route path="/register" element={<RegisterScreen/>}/>
    <Route path="Profile" element={<ProfileScreen/>}/>
    <Route path="" element={<SecureRoute/>} >
      <Route path="/shipping" element={<ShippingScreen/>}/>
      <Route path="/payment" element={<PaymentScreen/>}/>
      <Route path="/placeorder" element={<PlaceOrder/>}/>
      <Route path="/order/:id" element={<OrderScreen/>}/>
    </Route>
    <Route path="" element={<AdminRoute/>} >
      <Route path="/admin/orderlist" element={<OrderListScreen/>}/>
      <Route path="/admin/products" element={<ProductListScreen/>}/>
      <Route path="/admin/products/:id" element={<ProductEditScreen/>}/>
    </Route>
  </Route>
  )

);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Provider store={store}>
       <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
