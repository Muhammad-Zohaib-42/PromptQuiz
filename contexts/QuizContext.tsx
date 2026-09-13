"use client"

import { createContext, useContext } from "react";
import {useState} from "react"

export const QuizContext = createContext()

export const QuizProvider = ({children}) => {
    const [quizes, setQuizes] = useState([])
    const [currentQuiz, setCurrentQuiz] = useState({
      _id: 1,
  topic: "JavaScript & React Fundamentals",
  length: 3,
  difficulty: "Medium",
  format: "Multiple Choice",
  completed: false,
  timer: 5,
  score: 0,
  accuracy: 0,
  quiz: [
    {
      index: 0,
      question: "Which hook is used to handle side effects in React functional components?",
      options: ["useState", "useEffect", "useContext", "useReducer"],
      correctAnswer: "useEffect",
      userSelected: ""
    },
    {
      index: 1,
      question: "What does JSX stand for?",
      options: ["JavaScript XML", "Java Syntax Extension", "JSON Extended", "JavaScript XHR"],
      correctAnswer: "JavaScript XML",
      userSelected: ""
    },
    {
      index: 2,
      question: "Which of the following is a CSS framework commonly paired with modern React apps?",
      options: ["Tailwind CSS", "Laravel Blade", "Django Templates", "Flask Jinja"],
      correctAnswer: "Tailwind CSS",
      userSelected: ""
    }
  ]
})

    return <QuizContext.Provider value={{ quizes, setQuizes, currentQuiz, setCurrentQuiz }}>
        {children}
    </QuizContext.Provider>
}

export function useQuizContext() {
    return useContext(QuizContext)
}