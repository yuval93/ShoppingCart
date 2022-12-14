import { Routes, Route, Navigate } from "react-router-dom";
import ProductsList from "../productsList/ProductsList.js";
import ProductDetails from "../ProductDetails/ProductDetails";


function Routing() {
    return (
        <Routes>

            <Route path="/home" element={<ProductsList />} />
            <Route path="/products/details/:id" element={<ProductDetails />} />
            <Route path="/" element={<Navigate to="/home" />} />

            {/* Page not found route - must be last route: */}
            <Route path="*" element={<ProductsList />} />

        </Routes>
    );
}

export default Routing;
