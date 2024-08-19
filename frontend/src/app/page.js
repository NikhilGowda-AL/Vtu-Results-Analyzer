"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Loader from "./components/Loader";
import ResultsTable from "./components/Results";

const Home = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [usn, setUsn] = useState("");
  const [cookie, setCookie] = useState("");
  const [token, setToken] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState(null);

  const handleClick = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin":"*"

        },
        body: JSON.stringify({ usn, captcha, cookie, token }),
      });
      const data = await response.json();
      console.log(data);
      setResults(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://vtu-results-api.vercel.app/captcha",{
        method: "GET",
          headers:{
              "Content-Type": "application/json",
          "Access-Control-Allow-Origin":"*"

        },
        });
        const data = await response.json();

        if (data.image_data) {
          setImageUrl(`data:image/png;base64,${data.image_data}`);
          setCookie(data.cookie);
          setToken(data.token);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();

    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, []);

  if (results) {
    return <ResultsTable results={results} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <form onSubmit={handleClick}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              USN:
            </label>
            <input
              type="text"
              value={usn}
              onChange={(e) => setUsn(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter USN"
              required
            />
          </div>
          {loading ? (
            <Loader />
          ) : (
            imageUrl && (
              <div className="mb-4">
                <Image
                  src={imageUrl}
                  alt="captcha"
                  width={100}
                  height={100}
                  className="w-[40%]"
                />
              </div>
            )
          )}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Captcha:
            </label>
            <input
              type="text"
              value={captcha}
              onChange={(e) => setCaptcha(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Captcha"
              required
            />
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
