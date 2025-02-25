import { useState, useEffect } from "react";
import { searchGithubUser, searchGithub } from "../api/API";
import { Candidate } from "../interfaces/Candidate.interface";
//import SavedCandidates from "./SavedCandidates";

const CandidateSearch = () => {
  const [username, setUsername] = useState<string>("");
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  function saveCandidate() {
    if (candidate) {
      const storedCandidates: Candidate[] = JSON.parse(
        localStorage.getItem("savedCandidates") || "[]"
      );

      const isAlreadySaved = storedCandidates.some(
        (c) => c.login === candidate.login
      );
      if (!isAlreadySaved) {
        storedCandidates.push(candidate);
        localStorage.setItem(
          "savedCandidates",
          JSON.stringify(storedCandidates)
        );
        console.log(`Saved candidate: ${candidate.login}`);
      } else {
        console.log("Candidate already saved.");
      }
    }
  }

  function rejectCandidate() {
    console.log(`Rejected candidate: ${username}`);
    getUsername(); // Get a new candidate when rejecting
  }

  async function getUsername() {
    const users = await searchGithub();
    setUsername(users[0].login);
  }

  useEffect(() => {
    getUsername();
  }, []);

  // Fetch candidate data when username changes
  useEffect(() => {
    const fetchCandidateData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await searchGithubUser(username);
        setCandidate(data);
      } catch (error) {
        setError("Failed to load candidate data");
      } finally {
        setLoading(false);
      }
    };

    if (username) fetchCandidateData();
  }, [username]);

  return (
    <>
      <h1>Candidate Search</h1>
      <article>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && candidate && (
          <>
            <h2>{candidate.name || "No Name Provided"}</h2>
            <img src={candidate.avatar_url} alt={candidate.login} width="100" />
            <p>
              <strong>Username:</strong> {candidate.login}
            </p>
            <p>
              <strong>Location:</strong> {candidate.location || "Not provided"}
            </p>
            <p>
              <strong>Company:</strong> {candidate.company || "Not provided"}
            </p>
            <p>
              <strong>Email:</strong> {candidate.email || "Not provided"}
            </p>
            <p>
              <strong>Bio:</strong> {candidate.bio || "No bio available"}
            </p>
            <a
              href={candidate.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Profile
            </a>
            <button type="button" onClick={saveCandidate}>
              Save ✅
            </button>
            <button type="button" onClick={rejectCandidate}>
              Reject ❌
            </button>
          </>
        )}
      </article>

      {/* Only display saved candidates in the dedicated component */}
    </>
  );
};

export default CandidateSearch;
