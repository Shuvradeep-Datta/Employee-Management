
import Navbar from "./components/NavBar";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Welcome = lazy(() => import("./pages/Welcome.jsx"));
const Employees = lazy(() => import("./components/Employees.jsx"));
const EmployeeDetails = lazy(() => import("./pages/EmployeeDetails.jsx"));
const AddEmployee = lazy(() => import("./pages/AddEmployee.jsx"));
const EmployeeLayout = lazy(() => import("./pages/EmployeeLayout.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute.jsx"));
const EditEmployee = lazy(() => import("./pages/EditEmployee.jsx"));
const Product = lazy(() => import("./pages/Product.jsx"));
import ErrorBoundary from "./components/ErrorBoundary.jsx";


function App() {
    return (
        <>
            <Navbar />
            <ErrorBoundary>
            <Suspense
                fallback={
                    <div className="flex min-h-[40vh] items-center justify-center">
                        <p className="text-gray-600 animate-pulse">
                            Loading page...
                        </p>
                    </div>
                }>
                <Routes>

                    <Route
                        path="/"
                        element={<Welcome />}


                    >
                        <Route
                            index
                            element={
                                <Product />
                            }
                        ></Route>

                    </Route>



                    <Route
                        path="/employees"
                        element={
                            <ProtectedRoute>
                                <EmployeeLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route
                            index
                            element={<Employees />}
                        />

                        <Route
                            path="add"
                            element={<AddEmployee />}
                        />
                        <Route
                            path=":id/edit"
                            element={<EditEmployee />}
                        />

                        <Route
                            path=":id"
                            element={<EmployeeDetails />}
                        />
                    </Route>


                    <Route
                        path="*"
                        element={<NotFound />}
                    />

                </Routes>
            </Suspense>
            </ErrorBoundary>
        </>
    );
}

export default App;