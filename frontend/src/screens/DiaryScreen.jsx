import { useState, useEffect } from "react";

// component imports
import Header from "../components/Header";
import DiaryDropdown from "../components/DiaryDropdown";
import NoteCard from "../components/New/NoteCard";

const DiaryScreen = () => {
  const dropdownTitles = [
    "Feedback",
    "Results",
    "Results for Proctors",
    "Conference",
    "Paper Publications",
    "Patents",
    "GL, Workshops & FDP",
    "Textbooks Authored",
    "Additional Responsibilities",
  ];

  const [currentDateTime, setCurrentDateTime] = useState("");

  const getCurrentDateTime = () => {
    const now = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    setCurrentDateTime(now.toLocaleDateString("en-IN", options));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getCurrentDateTime();
    }, 1000);
    getCurrentDateTime();
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />
      <aside className="date-day">{currentDateTime}</aside>

      <section className="category-section ">
        <h2 className="category-heading">Diary</h2>

        {dropdownTitles.map((title, index) => (
          <DiaryDropdown key={index} title={title} />
        ))}
      </section>
    </>
  );
};

export default DiaryScreen;
