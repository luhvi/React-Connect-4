import { useState } from "react";

const MainDisplay = () => {
  const [playerSpaces, setPlayerSpaces] = useState<number[]>([]);
  const [computerSpaces, setComputerSpaces] = useState<number[]>([]);
  const [turn, setTurn] = useState<"yellow" | "red">("yellow");
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [winner, setWinner] = useState<"yellow" | "red" | "draw" | "">("");
  const [playerWins, setPlayerWins] = useState<number>(0);
  const [computerWins, setComputerWins] = useState<number>(0);
  const [draws, setDraws] = useState<number>(0);

  const selectSpace = (space: number) => {
    if (
      isPlaying &&
      playerSpaces.includes(space) !== true &&
      computerSpaces.includes(space) !== true
    ) {
      if (turn === "yellow") {
        setPlayerSpaces((prevPlayerSpaces) => [...prevPlayerSpaces, space]);
        checkForPlayerWin(space);
        setTurn("red");
      } else if (turn === "red") {
        setComputerSpaces((prevPlayerSpaces) => [...prevPlayerSpaces, space]);
        checkForComputerWin(space);
        setTurn("yellow");
      }
    }
  };

  const checkForWin = (spaces: number[]): boolean => {
    const directions = [1, 7, 6, 8];

    for (let i = 0; i < spaces.length; i++) {
      const start = spaces[i];

      for (let dir of directions) {
        const sequence = [start, start + dir, start + dir * 2, start + dir * 3];
        if (sequence.every((pos) => spaces.includes(pos))) {
          return true;
        }
      }
    }

    return false;
  };

  const checkForPlayerWin = (lastSpace: number) => {
    const newPlayerSpaces = [...playerSpaces, lastSpace];
    if (checkForWin(newPlayerSpaces)) {
      setWinner("yellow");
      setPlayerWins((prevPlayerWins) => prevPlayerWins + 1);
      setIsPlaying(false);
    } else if (playerSpaces.length + computerSpaces.length === 42) {
      setWinner("draw");
      setDraws((prevDraws) => prevDraws + 1);
      setIsPlaying(false);
    }
  };

  const checkForComputerWin = (lastSpace: number) => {
    const newComputerSpaces = [...computerSpaces, lastSpace];
    if (checkForWin(newComputerSpaces)) {
      setWinner("red");
      setComputerWins((prevComputerWins) => prevComputerWins + 1);
      setIsPlaying(false);
    } else if (playerSpaces.length + computerSpaces.length === 42) {
      setWinner("draw");
      setDraws((prevDraws) => prevDraws + 1);
      setIsPlaying(false);
    }
  };

  const playAgain = () => {
    setPlayerSpaces([]);
    setComputerSpaces([]);
    setTurn("yellow");
    setIsPlaying(true);
    setWinner("");
  };

  const getButtonClass = (space: number) => {
    if (playerSpaces.includes(space)) {
      return "bg-yellow-500 hover:bg-yellow-400";
    } else if (computerSpaces.includes(space)) {
      return "bg-red-500 hover:bg-red-400";
    } else {
      return "bg-gray-100 hover:bg-white";
    }
  };

  return (
    <div>
      {winner === "" ? (
        <div className="mb-2 flex items-center justify-center text-center">
          <h1 className="text-2xl">
            <span
              className={`font-bold ${turn === "yellow" ? "text-yellow-400" : "text-red-400"}`}
            >
              {turn === "yellow" ? "Yellow" : "Red"}
            </span>{" "}
            <span className="font-medium">'s turn!</span>
          </h1>
        </div>
      ) : (
        <div className="mb-2 flex animate-bounce items-center justify-center text-center">
          {winner !== "draw" ? (
            <h1 className="text-2xl font-medium">
              <span
                className={`font-bold ${winner === "yellow" ? "text-yellow-400" : "text-red-400"}`}
              >
                {winner === "yellow" ? "Yellow " : "Red "}
              </span>
              won!
            </h1>
          ) : (
            <h1 className="text-2xl font-bold">Draw!</h1>
          )}
        </div>
      )}
      <div className="grid grid-cols-7 gap-4 rounded-lg bg-blue-500 px-4 py-4 shadow-xl">
        <div>
          <button
            className={`h-15 w-15 cursor-pointer rounded-full shadow-lg transition-colors duration-100 ease-in-out ${getButtonClass(1)}`}
            onClick={() => selectSpace(1)}
          >
            1
          </button>
        </div>
        <div>
          <button
            className={`h-15 w-15 cursor-pointer rounded-full shadow-lg transition-colors duration-100 ease-in-out ${getButtonClass(2)}`}
            onClick={() => selectSpace(2)}
          >
            2
          </button>
        </div>
        <div>
          <button
            className={`h-15 w-15 cursor-pointer rounded-full shadow-lg transition-colors duration-100 ease-in-out ${getButtonClass(3)}`}
            onClick={() => selectSpace(3)}
          >
            3
          </button>
        </div>
        <div>
          <button
            className={`h-15 w-15 cursor-pointer rounded-full shadow-lg transition-colors duration-100 ease-in-out ${getButtonClass(4)}`}
            onClick={() => selectSpace(4)}
          >
            4
          </button>
        </div>
        <div>
          <button
            className={`h-15 w-15 cursor-pointer rounded-full shadow-lg transition-colors duration-100 ease-in-out ${getButtonClass(5)}`}
            onClick={() => selectSpace(5)}
          >
            5
          </button>
        </div>
        <div>
          <button
            className={`h-15 w-15 cursor-pointer rounded-full shadow-lg transition-colors duration-100 ease-in-out ${getButtonClass(6)}`}
            onClick={() => selectSpace(6)}
          >
            6
          </button>
        </div>
        <div>
          <button
            className={`h-15 w-15 cursor-pointer rounded-full shadow-lg transition-colors duration-100 ease-in-out ${getButtonClass(7)}`}
            onClick={() => selectSpace(7)}
          >
            7
          </button>
        </div>
        <div>
          <button
            className={`h-15 w-15 cursor-pointer rounded-full shadow-lg transition-colors duration-100 ease-in-out ${getButtonClass(8)}`}
            onClick={() => selectSpace(8)}
          >
            8
          </button>
        </div>
        <div>
          <button
            className={`h-15 w-15 cursor-pointer rounded-full shadow-lg transition-colors duration-100 ease-in-out ${getButtonClass(9)}`}
            onClick={() => selectSpace(9)}
          >
            9
          </button>
        </div>
        <div>
          <button
            className={`$ h-15 w-15 cursor-pointer rounded-full shadow-lg transition-colors duration-100 ease-in-out ${getButtonClass(10)}`}
            onClick={() => selectSpace(10)}
          >
            10
          </button>
        </div>
        <div>
          <button
            className={`$ h-15 w-15 cursor-pointer rounded-full shadow-lg transition-colors duration-100 ease-in-out ${getButtonClass(11)}`}
            onClick={() => selectSpace(11)}
          >
            11
          </button>
        </div>
        <div>
          <button
            className={`$ h-15 w-15 cursor-pointer rounded-full shadow-lg transition-colors duration-100 ease-in-out ${getButtonClass(12)}`}
            onClick={() => selectSpace(12)}
          >
            12
          </button>
        </div>
        <div>
          <button
            className={`$ h-15 w-15 cursor-pointer rounded-full shadow-lg transition-colors duration-100 ease-in-out ${getButtonClass(13)}`}
            onClick={() => selectSpace(13)}
          >
            13
          </button>
        </div>
        <div>
          <button
            className={`$ h-15 w-15 cursor-pointer rounded-full shadow-lg transition-colors duration-100 ease-in-out ${getButtonClass(14)}`}
            onClick={() => selectSpace(14)}
          >
            14
          </button>
        </div>
        <div>
          <button
            className={`$ h-15 w-15 cursor-pointer rounded-full shadow-lg transition-colors duration-100 ease-in-out ${getButtonClass(15)}`}
            onClick={() => selectSpace(15)}
          >
            15
          </button>
        </div>
        <div>
          <button
            className={`$ h-15 w-15 cursor-pointer rounded-full shadow-lg transition-colors duration-100 ease-in-out ${getButtonClass(16)}`}
            onClick={() => selectSpace(16)}
          >
            16
          </button>
        </div>
        <div>
          <button
            className={`$ h-15 w-15 cursor-pointer rounded-full shadow-lg transition-colors duration-100 ease-in-out ${getButtonClass(17)}`}
            onClick={() => selectSpace(17)}
          >
            17
          </button>
        </div>
        <div>
          <button
            className={`$ h-15 w-15 cursor-pointer rounded-full shadow-lg transition-colors duration-100 ease-in-out ${getButtonClass(18)}`}
            onClick={() => selectSpace(18)}
          >
            18
          </button>
        </div>
        <div>
          <button
            className={`$ h-15 w-15 cursor-pointer rounded-full shadow-lg transition-colors duration-100 ease-in-out ${getButtonClass(19)}`}
            onClick={() => selectSpace(19)}
          >
            19
          </button>
        </div>
        <div>
          <button
            className={`$ h-15 w-15 cursor-pointer rounded-full shadow-lg transition-colors duration-100 ease-in-out ${getButtonClass(20)}`}
            onClick={() => selectSpace(20)}
          >
            20
          </button>
        </div>
        <div>
          <button
            className={`$ h-15 w-15 cursor-pointer rounded-full shadow-lg transition-colors duration-100 ease-in-out ${getButtonClass(21)}`}
            onClick={() => selectSpace(21)}
          >
            21
          </button>
        </div>
        <div>
          <button
            className={`$ h-15 w-15 cursor-pointer rounded-full shadow-lg transition-colors duration-100 ease-in-out ${getButtonClass(22)}`}
            onClick={() => selectSpace(22)}
          >
            22
          </button>
        </div>
        <div>
          <button
            className={`$ h-15 w-15 cursor-pointer rounded-full shadow-lg transition-colors duration-100 ease-in-out ${getButtonClass(23)}`}
            onClick={() => selectSpace(23)}
          >
            23
          </button>
        </div>
        <div>
          <button
            className={`$ h-15 w-15 cursor-pointer rounded-full shadow-lg transition-colors duration-100 ease-in-out ${getButtonClass(24)}`}
            onClick={() => selectSpace(24)}
          >
            24
          </button>
        </div>
        <div>
          <button
            className={`$ h-15 w-15 cursor-pointer rounded-full shadow-lg transition-colors duration-100 ease-in-out ${getButtonClass(25)}`}
            onClick={() => selectSpace(25)}
          >
            25
          </button>
        </div>
        <div>
          <button
            className={`$ h-15 w-15 cursor-pointer rounded-full shadow-lg transition-colors duration-100 ease-in-out ${getButtonClass(26)}`}
            onClick={() => selectSpace(26)}
          >
            26
          </button>
        </div>
        <div>
          <button
            className={`$ h-15 w-15 cursor-pointer rounded-full shadow-lg transition-colors duration-100 ease-in-out ${getButtonClass(27)}`}
            onClick={() => selectSpace(27)}
          >
            27
          </button>
        </div>
        <div>
          <button
            className={`$ h-15 w-15 cursor-pointer rounded-full shadow-lg transition-colors duration-100 ease-in-out ${getButtonClass(28)}`}
            onClick={() => selectSpace(28)}
          >
            28
          </button>
        </div>
        <div>
          <button
            className={`$ h-15 w-15 cursor-pointer rounded-full shadow-lg transition-colors duration-100 ease-in-out ${getButtonClass(29)}`}
            onClick={() => selectSpace(29)}
          >
            29
          </button>
        </div>
        <div>
          <button
            className={`$ h-15 w-15 cursor-pointer rounded-full shadow-lg transition-colors duration-100 ease-in-out ${getButtonClass(30)}`}
            onClick={() => selectSpace(30)}
          >
            30
          </button>
        </div>
        <div>
          <button
            className={`$ h-15 w-15 cursor-pointer rounded-full shadow-lg transition-colors duration-100 ease-in-out ${getButtonClass(31)}`}
            onClick={() => selectSpace(31)}
          >
            31
          </button>
        </div>
        <div>
          <button
            className={`$ h-15 w-15 cursor-pointer rounded-full shadow-lg transition-colors duration-100 ease-in-out ${getButtonClass(32)}`}
            onClick={() => selectSpace(32)}
          >
            32
          </button>
        </div>
        <div>
          <button
            className={`$ h-15 w-15 cursor-pointer rounded-full shadow-lg transition-colors duration-100 ease-in-out ${getButtonClass(33)}`}
            onClick={() => selectSpace(33)}
          >
            33
          </button>
        </div>
        <div>
          <button
            className={`$ h-15 w-15 cursor-pointer rounded-full shadow-lg transition-colors duration-100 ease-in-out ${getButtonClass(34)}`}
            onClick={() => selectSpace(34)}
          >
            34
          </button>
        </div>
        <div>
          <button
            className={`$ h-15 w-15 cursor-pointer rounded-full shadow-lg transition-colors duration-100 ease-in-out ${getButtonClass(35)}`}
            onClick={() => selectSpace(35)}
          >
            35
          </button>
        </div>
        <div>
          <button
            className={`$ h-15 w-15 cursor-pointer rounded-full shadow-lg transition-colors duration-100 ease-in-out ${getButtonClass(36)}`}
            onClick={() => selectSpace(36)}
          >
            36
          </button>
        </div>
        <div>
          <button
            className={`$ h-15 w-15 cursor-pointer rounded-full shadow-lg transition-colors duration-100 ease-in-out ${getButtonClass(37)}`}
            onClick={() => selectSpace(37)}
          >
            37
          </button>
        </div>
        <div>
          <button
            className={`$ h-15 w-15 cursor-pointer rounded-full shadow-lg transition-colors duration-100 ease-in-out ${getButtonClass(38)}`}
            onClick={() => selectSpace(38)}
          >
            38
          </button>
        </div>
        <div>
          <button
            className={`$ h-15 w-15 cursor-pointer rounded-full shadow-lg transition-colors duration-100 ease-in-out ${getButtonClass(39)}`}
            onClick={() => selectSpace(39)}
          >
            39
          </button>
        </div>
        <div>
          <button
            className={`$ h-15 w-15 cursor-pointer rounded-full shadow-lg transition-colors duration-100 ease-in-out ${getButtonClass(40)}`}
            onClick={() => selectSpace(40)}
          >
            40
          </button>
        </div>
        <div>
          <button
            className={`$ h-15 w-15 cursor-pointer rounded-full shadow-lg transition-colors duration-100 ease-in-out ${getButtonClass(41)}`}
            onClick={() => selectSpace(41)}
          >
            41
          </button>
        </div>
        <div>
          <button
            className={`$ h-15 w-15 cursor-pointer rounded-full shadow-lg transition-colors duration-100 ease-in-out ${getButtonClass(42)}`}
            onClick={() => selectSpace(42)}
          >
            42
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mt-2 flex items-center justify-center text-center">
          <h1 className="text-lg font-medium">
            <span className="font-bold text-yellow-500">Yellow </span>
            wins: {playerWins},
            <span className="font-bold text-red-500"> Red </span>
            wins: {computerWins},<span className="font-bold"> Draws: </span>
            {draws}
          </h1>
        </div>
        <div className="mt-2">
          <button
            className="cursor-pointer rounded-full bg-gray-800 px-5 py-2 text-white shadow-lg"
            onClick={() => playAgain()}
          >
            Play again
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainDisplay;
