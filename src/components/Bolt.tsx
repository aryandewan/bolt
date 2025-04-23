import React, {ChangeEvent} from 'react'

interface BoltProps {
    BoltRef: React.Ref<HTMLDivElement>
    timer: number
    wpm: number
    accuracy: number
    sentence: string
    input: string
    inputRef: React.Ref<HTMLInputElement>
    startTime: number | null
    setStartTime: (startTime: number | null) => void
    setInput: (input: string) => void
    sessionOver: boolean
    handleBigOnClick: () => void
}

const Bolt = ({BoltRef, timer, wpm, accuracy, sentence, input, inputRef, startTime, setStartTime, setInput, sessionOver, handleBigOnClick}: BoltProps) => {
    return (
        <div ref={BoltRef} onClick={handleBigOnClick} className="w-full p-6 flex flex-col items-center justify-start min-h-dvh scale-100 origin-bottom-right mt-8 bg-black absolute z-0 bottom-0 right-0 transition-all duration-200 ease-out overflow-hidden font-ds">
            <div className="flex justify-between text-3xl text-orange-400 w-full">
                <span>{timer}s</span>
                <span>{wpm}</span>
                <span>{accuracy}%</span>
            </div>

            <p className="text-9xl select-none mb-5">
                {sentence.split("").map((char, i) => (
                    <span
                        key={i}
                        className={`transition-all ${input[i] === undefined ? `text-gray-500` : input[i] === char ? `text-orange-400` : `text-gray-500`}`}
                    >
              {char}
            </span>
                ))}
            </p>

            <input
                ref={inputRef}
                type="text"
                className="w-full border-b-4 bg-black border-gray-300 p-2 outline-none text-7xl text-white"
                value={input}
                onChange={(e:ChangeEvent<HTMLInputElement>): void => {
                    if (!startTime) setStartTime(Date.now());
                    setInput(e.target.value);
                }}
                placeholder="Start typing here..."
                disabled={sessionOver}
            />
        </div>
    )
}
export default Bolt
