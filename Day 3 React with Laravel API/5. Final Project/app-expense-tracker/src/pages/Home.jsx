import { getCurrentUser, logout } from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

function Home() {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <Header />
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Welcome,
          </span>{" "}
          {user?.name}
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
          An expense tracker system helps users manage their spending by
          allowing them to record, categorize, and analyze expenses. It
          typically includes features like transaction entry, expense
          categorization, and basic visualizations. Advanced systems may offer
          budgeting tools, recurring expense management, bank integration, and
          multi-platform access to enhance financial oversight and convenience.
        </p>
      </div>

      <Navbar />
    </section>
  );
}

export default Home;
