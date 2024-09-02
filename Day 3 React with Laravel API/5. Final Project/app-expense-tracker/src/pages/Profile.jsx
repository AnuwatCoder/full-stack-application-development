import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Loader from "../components/Loader";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const loggedInUser = getCurrentUser();
        if (!loggedInUser) {
          navigate("/login");
        } else {
          setUser(loggedInUser);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/login");
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchUser();
  }, [navigate]);

  if (loading) {
    return <Loader />; // Show loader while data is being fetched
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <Header />
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-5">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Profile
          </span>
        </h1>
      </div>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-5">
        <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
          <div className="flex flex-col pb-3">
            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
              Email address
            </dt>
            <dd className="text-lg font-semibold">{user.email}</dd>
          </div>
          <div className="flex flex-col py-3">
            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
              Full name
            </dt>
            <dd className="text-lg font-semibold">{user.name}</dd>
          </div>
        </dl>
      </div>
      <Navbar />
    </section>
  );
}

export default Profile;
