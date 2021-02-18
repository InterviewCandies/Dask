import React, { useEffect, useState } from "react";
import Loader from "react-spinners/BarLoader";

function useLoader() {
  const [loading, setLoading] = useState(false);
  const startLoader = () => setLoading(true);
  const endLoader = () => setLoading(false);
  useEffect(() => {}, [loading]);
  const LoaderProvider = () => {
    useEffect(() => {}, [loading]);
    return <div>{loading && <Loader></Loader>}</div>;
  };
  return { startLoader, endLoader, LoaderProvider };
}

export default useLoader;
