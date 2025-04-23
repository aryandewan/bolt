"use client"

import React, {useEffect, useRef, useState} from 'react'
import SENTENCES from "@/utils/sentences";
import Leaderboard from "@/components/Leaderboard";
import {SessionResult} from "@/utils/interface";
import Bolt from "@/components/Bolt";

const Dashboard = () => {
    const [sentence, setSentence] = useState<string>("")
    const [input, setInput] = useState<string>("")
    const [startTime, setStartTime] = useState<number | null>(null)
    const [wpm, setWpm] = useState<number>(0)
    const [accuracy, setAccuracy] = useState<number>(100)
    const [timer, setTimer] = useState<number>(15)
    const [sessionOver, setSessionOver] = useState<boolean>(false)
    const [leaderboard, setLeaderboard] = useState<SessionResult[]>([])

    const inputRef = useRef<HTMLInputElement>(null);
    const intervalRef = useRef<ReturnType<typeof  setInterval> | null>(null);
    const leaderboardRef = useRef<HTMLDivElement>(null);
    const BoltRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        startNewSession();
        const saved = localStorage.getItem("leaderboard");
        if (saved) setLeaderboard(JSON.parse(saved));
    }, []);

    useEffect(() => {
        if (!startTime || sessionOver) return;

        intervalRef.current = setInterval(() => {
            setTimer((prev: number) => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current!);
                    finishSession();
                    return 0;
                }
                return prev - 1;
            })
        }, 1000)

        return () => clearInterval(intervalRef.current!)

    }, [startTime]);

    useEffect(() => {
        if (!startTime) return;

        const now: number = Date.now()
        const minutes: number = (now - startTime) / 1000/ 15;
        const wordsTyped: number = input.trim().split(" ").length
        if(minutes > 0.01) setWpm(Math.round(wordsTyped/ minutes))

        const correctChars: number = sentence.split("").filter((char: string, i: number):boolean => input[i] === char).length;
        setAccuracy(Math.round((correctChars / input.length) * 100) || 100);

        if (input === sentence) {
            clearInterval(intervalRef.current!);
            finishSession();
        }
    }, [input]);

    const startNewSession = (): void => {
        setSentence(SENTENCES[Math.floor(Math.random() * SENTENCES.length)]);
        setInput("");
        setStartTime(null);
        setWpm(0);
        setAccuracy(100);
        setTimer(15);
        setSessionOver(false);
        inputRef.current?.focus();
    }

    const finishSession = (): void => {
        setSessionOver(true);

        const result: SessionResult = {
            wpm,
            accuracy,
            timestamp: Date.now(),
            sentence,
        };
        const updated = [result, ...leaderboard].slice(0, 10);
        setLeaderboard(updated);
        localStorage.setItem("leaderboard", JSON.stringify(updated));

        setTimeout(() => startNewSession(), 1000);
    }

    const handleSmallOnClick  = ():void => {
        if (leaderboardRef.current && BoltRef.current) {
            leaderboardRef.current.classList.remove("scale-30", "z-10", "cursor-pointer", "border-2", "border-white", "rounded-4xl");
            BoltRef.current.classList.remove("scale-100", "z-0");
            BoltRef.current.classList.add("scale-30", "z-10", "border-2", "border-white", "rounded-4xl");
            leaderboardRef.current.classList.add("scale-100", "z-0", "cursor-default");
        }
    }

    const handleBigOnClick = ():void => {
        if (leaderboardRef.current && BoltRef.current) {
            leaderboardRef.current.classList.remove("scale-100", "z-0", "cursor-default");
            BoltRef.current.classList.remove("scale-30", "z-10", "border-2", "border-white", "rounded-4xl");
            BoltRef.current.classList.add("scale-100", "z-0");
            leaderboardRef.current.classList.add("scale-30", "z-10", "cursor-pointer", "border-2", "border-white", "rounded-4xl");
        }
    }


    return (
        <div className="min-h-screen bg-black text-gray-500 flex flex-col items-center justify-start p-4 w-full relative">
            <Bolt BoltRef={BoltRef} timer={timer} wpm={wpm} accuracy={accuracy} sentence={sentence} input={input} inputRef={inputRef} startTime={startTime} setStartTime={setStartTime} setInput={setInput} sessionOver={sessionOver} handleBigOnClick={handleBigOnClick} />
            <Leaderboard leaderboard={leaderboard} leaderboardRef={leaderboardRef} handleSmallOnClick={handleSmallOnClick} />
        </div>
    )
}
export default Dashboard
