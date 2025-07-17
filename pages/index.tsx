"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getWrongSet, addToWrongSet, clearWrongSet } from "@/lib/wrongStorage";

interface Question {
  id: string;
  chapter: string;
  question: string;
  options: { [key: string]: string };
  answer: string;
}

export default function DronePracticeApp() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [mode, setMode] = useState<"normal" | "wrong">("normal");

  useEffect(() => {
    fetch("/drone_exam_question_bank.json")
      .then((res) => res.json())
      .then((data: Question[]) => {
        const set = getWrongSet();
        const source = mode === "wrong" ? data.filter((q: Question) => set.has(q.id)) : data;
        setQuestions(shuffleArray(source));
        setStartTime(Date.now());
      });
  }, [mode]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (startTime) {
      timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [startTime]);

  const handleSelect = (option: string) => {
    if (!showAnswer) {
      setSelected(option);
      setShowAnswer(true);
      if (option !== questions[current].answer) {
        addToWrongSet(questions[current].id);
      }
    }
  };

  const nextQuestion = () => {
    setCurrent((prev) => prev + 1);
    setSelected(null);
    setShowAnswer(false);
  };

  const restart = (type: "normal" | "wrong") => {
    setMode(type);
    setCurrent(0);
    setSelected(null);
    setShowAnswer(false);
    setElapsedTime(0);
    clearWrongSet();
  };

  if (questions.length === 0) return <p className="p-4">載入中...</p>;
  if (current >= questions.length) {
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    return (
      <div className="p-4 space-y-2 text-center">
        <h2 className="text-xl font-bold">🎉 你已完成所有題目！</h2>
        <p>總共花費時間：{minutes} 分 {seconds} 秒</p>
        <div className="space-x-2">
          <Button onClick={() => restart("normal")}>重新練習全部</Button>
          <Button onClick={() => restart("wrong")}>只練習錯題</Button>
        </div>
      </div>
    );
  }

  const q = questions[current];
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <div className="text-right text-sm text-gray-500">
        ⏱ 時間：{minutes} 分 {seconds} 秒
      </div>
      <Card>
        <CardContent className="space-y-2">
          <p className="text-sm text-gray-500">{q.chapter}</p>
          <h2 className="text-lg font-semibold">
            {q.id}. {q.question}
          </h2>
          {Object.entries(q.options).map(([key, text]) => (
            <Button
              key={key}
              variant={
                selected === key
                  ? key === q.answer
                    ? "default"
                    : "destructive"
                  : "outline"
              }
              className="w-full justify-start"
              onClick={() => handleSelect(key)}
              disabled={showAnswer}
            >
              {key}. {text}
            </Button>
          ))}
          {showAnswer && (
            <p className="text-sm text-green-600">
              正確答案：{q.answer}（{q.options[q.answer]}）
            </p>
          )}
          {showAnswer && (
            <Button onClick={nextQuestion} className="mt-2">
              下一題
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
