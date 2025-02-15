import { useState, useEffect } from "react";
import { Candidate } from "../interfaces/Candidate.interface";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  // Load saved candidates from local storage when component mounts
  useEffect(() => {
    const storedCandidates = JSON.parse(
      localStorage.getItem("savedCandidates") || "[]"
    );
    setSavedCandidates(storedCandidates);
  }, []);

  function removeCandidate(login: string) {
    const updatedCandidates = savedCandidates.filter(
      (candidate) => candidate.login !== login
    );
    setSavedCandidates(updatedCandidates);
    localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
  }

  return (
    <>
      <h1>Potential Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No candidates saved.</p>
      ) : (
        <ul>
          {savedCandidates.map((candidate) => (
            <li key={candidate.login}>
              <img
                src={candidate.avatar_url}
                alt={candidate.login}
                width="50"
              />
              <strong>{candidate.name || candidate.login}</strong> -{" "}
              {candidate.location || "No Location"}
              <button onClick={() => removeCandidate(candidate.login)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SavedCandidates;
