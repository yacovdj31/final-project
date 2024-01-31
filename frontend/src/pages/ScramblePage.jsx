import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

const ScramblePage = () => {
  const [word, setWord] = useState("");
  const [history, setHistory] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchHistory = async () => {
      if (user) {
        try {
          const response = await axios.get("/api/scramble", {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          setHistory(response.data);
        } catch (error) {
          console.error("Error fetching history", error);
        }
      }
    };
    fetchHistory();
  }, [user]);

  const handleScramble = async () => {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const scrambledWord = word
          .split("")
          .sort(() => 0.5 - Math.random())
          .join("");

        try {
          const newEntry = { original: word, scrambled: scrambledWord };
          const serverResponse = await axios.post("/api/scramble", newEntry, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          setHistory([...history, serverResponse.data]);
        } catch (postError) {
          console.error("Error saving scramble", postError);
        }
      } else {
        alert("This is not a valid English word.");
      }
    } catch (error) {
      console.error("Error verifying the word:", error);
      alert("There was an error verifying the word.");
    }
    setWord("");
  };

  // Rest of your component
  return (
    <div className="scramble">
      <input
        className="input-word"
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />
      <button className="button-scramble" onClick={handleScramble}>
        Scramble
      </button>
      <div className="history">
        <h3 className="your-questions">Your Questions</h3>
        <ul className="scrambled-questions-ul">
          {history.map(({ original, scrambled }, index) => (
            <li className="scrambled-results" key={index}>
              <p className="scrambled-box">
                {original} - {scrambled}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ScramblePage;
