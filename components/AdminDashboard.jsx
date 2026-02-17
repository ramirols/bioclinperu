import AdminPatients from "./AdminPatients";
import AdminExamTypes from "./AdminExamTypes";
import AdminResults from "./AdminResults";

export default function AdminDashboard() {
    return (
        <div className="p-10 space-y-10 container mx-auto">
            <h1 className="text-3xl font-bold">Panel Administrador</h1>

            <AdminPatients />
            <AdminExamTypes />
            <AdminResults />
        </div>
    );
}