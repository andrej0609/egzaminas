import { createContext, useState } from "react";
import { useEffect } from "react";
import Monkey from "../components/img/monkey.gif"
import { useContext } from "react";
import UserContext from "./UserContext";

const AnswerContext = createContext();

const AnswerProvider = ({ children }) => {

  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { loggedInUser } = useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('http://localhost:5000/atsakymas');
      const data = await res.json();
      setAnswers(data);
      setLoading(false);
    }
    fetchData();
  }, []);


  if (loading) {
    return <div className="loading">
      <img src={Monkey} alt="loading" />
    </div>
  }

  const addNewAnswer = async (newAnswer) => {
    const res = await fetch('http://localhost:5000/atsakymas', {
      method: 'POST',
      body: JSON.stringify(newAnswer),
      headers: { 'Content-Type': 'application/json' }
    });
    const updatedData = await res.json();
    setAnswers([...answers, updatedData]);
  }

  const deleteAnswer = async (id) => {
    await fetch(`http://localhost:5000/atsakymas/${id}`, {
      method: 'DELETE'
    });
    setAnswers(answers.filter(answer => answer.id !== id));
  }

  const updateAnswer = async (id, updatedAnswer) => {
    await fetch(`http://localhost:5000/atsakymas/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedAnswer),
      headers: { 'Content-Type': 'application/json' }
    });
    setAnswers(answers.map(answer => answer.id === id ? { ...answer, ...updatedAnswer } : answer));
  }

  const likeAnswer = async (id) => {
    const answer = answers.find((answer) => answer.id === id);
    if (answer.likedBy.includes(loggedInUser.id)) {
      const res = await fetch(`http://localhost:5000/atsakymas/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ likes: answer.likes - 1, likedBy: answer.likedBy.filter(userId => userId !== loggedInUser.id) }),
        headers: { 'Content-Type': 'application/json' }
      });
      const updatedData = await res.json();
      setAnswers(answers.map(answer => answer.id.toString() === id ? { ...answer, ...updatedData } : answer));
    } else {
      const res = await fetch(`http://localhost:5000/atsakymas/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ likes: answer.likes + 1, likedBy: [...answer.likedBy, loggedInUser.id] }),
        headers: { 'Content-Type': 'application/json' }
      });
      const updatedData = await res.json();
      setAnswers(answers.map(answer => answer.id.toString() === id ? { ...answer, ...updatedData } : answer));
    }
  };

  const dislikeAnswer = async (id) => {
    const answer = answers.find((answer) => answer.id === id);
    if (answer.dislikedBy.includes(loggedInUser.id)) {
      const res = await fetch(`http://localhost:5000/atsakymas/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ dislikes: answer.dislikes - 1, dislikedBy: answer.dislikedBy.filter(userId => userId !== loggedInUser.id) }),
        headers: { 'Content-Type': 'application/json' }
      });
      const updatedData = await res.json();
      setAnswers(answers.map(answer => answer.id.toString() === id ? { ...answer, ...updatedData } : answer));
    } else {
      const res = await fetch(`http://localhost:5000/atsakymas/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ dislikes: answer.dislikes + 1, dislikedBy: [...answer.dislikedBy, loggedInUser.id] }),
        headers: { 'Content-Type': 'application/json' }
      });
      const updatedData = await res.json();
      setAnswers(answers.map(answer => answer.id.toString() === id ? { ...answer, ...updatedData } : answer));
    }
  };

  return (
    <AnswerContext.Provider
      value={{
        answers,
        addNewAnswer,
        deleteAnswer,
        updateAnswer,
        likeAnswer,
        dislikeAnswer
      }}
    >
      {children}
    </AnswerContext.Provider>
  );
}

export { AnswerProvider };
export default AnswerContext;