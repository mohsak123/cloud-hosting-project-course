import Link from "next/link";

const NotFound = () => {
  return (
    <section className="fix-height flex justify-center items-center flex-col">
      <h1 className="text-7xl text-gray-800 font-bold">404</h1>
      <p className="text-gray-500  text-3xl mt-2 mb-5">Page Not Found</p>
      <Link className="text-xl underline text-blue-700" href="/">
        Go To Home Page
      </Link>
    </section>
  );
};

export default NotFound;
