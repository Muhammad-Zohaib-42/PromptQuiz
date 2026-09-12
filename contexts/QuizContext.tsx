"use client"

import { createContext, useContext } from "react";
import {useState} from "react"

export const QuizContext = createContext()

export const QuizProvider = ({children}) => {
    const [quizes, setQuizes] = useState([])
    const [currentQuiz, setCurrentQuiz] = useState({
  topic: "",
  length: 0,
  difficulty: "Medium",
  format: "Multiple Choice",
  completed: false,
  timer: 30,
  score: 0,
  accuracy: 0,
  quiz: []
})

    return <QuizContext.Provider value={{ quizes, setQuizes, currentQuiz, setCurrentQuiz }}>
        {children}
    </QuizContext.Provider>
}

export function useQuizContext() {
    return useContext(QuizContext)
}