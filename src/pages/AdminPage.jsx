import { Container } from "../components";
import { useAuthStatus } from "../hooks/useAuthStatus";

const AdminPage = () => {
  const { user } = useAuthStatus();
  if (!user) return null;

  return (
    <Container className="max-w-2xl">
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="w-full aspect-[3/1] bg-slate-100">
          <img src="/user.jpg" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="text-xl font-semibold text-slate-900">Hey, {user.name}</h1>
          <a
            href="mailto:kkharoliya20@gmail.com"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            <i className="ri-mail-send-line"></i> {user.email}
          </a>
        </div>
      </div>
    </Container>
  );
};

export default AdminPage;
