import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/redux/authProvider";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 overflow-y-auto md:ml-64">
          {children}
        </main>
        <Footer />
        <Toaster position="bottom-right" />
      </div>
    </AuthProvider>
  );
}
