import { useEffect, useState } from "react";
import "./App.css";
import AlertModal from "./components/AlertModal";

function App() {
  const wordPackage = [
    "BAN TUYEN NGON DOC LAP",
    "LOI KEU GOI TOAN QUOC KHANG CHIEN",
    "NHAT KY TRONG TU",
  ];

  const [selectedPack, setSelectedPack] = useState(null);
  const [wordList, setWordList] = useState([]);
  const [guess, setGuess] = useState();
  const [alert, setAlert] = useState({
    status: false,
    message: "",
    open: false,
  });

  useEffect(() => {
    setWordList([]);
    setGuess(null);
    if (selectedPack) {
      const wordArray = selectedPack.split("");
      console.log("SELECTED PACK: ", wordArray.length);
      wordArray.map((word, index) => {
        const wordObj = {
          char: word,
          visible: false,
        };
        setWordList((current) => [...current, wordObj]);
      });
    }
  }, [selectedPack]);

  const checkGuess = () => {
    if (guess) {
      if (selectedPack.includes(guess)) {
        let newList = [...wordList];
        let count = 0;
        newList.map((word, index) => {
          if (word.char.match(guess) && word.visible === false) {
            newList[index].visible = true;
            count++;
          }
        });
        setWordList[newList];
        setAlert({
          status: count > 0,
          message:
            count > 0
              ? count === 1
                ? "Congrats, there is 1 " + guess
                : "Congrats, there are " + count + " " + guess + "s"
              : "Already picked",
          open: true,
        });
      } else {
        setAlert({
          status: false,
          message: "Oops, there is no " + guess,
          open: true,
        });
      }
    }
    setGuess(null);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start gap-4 bg-teal-950 text-white">
      <button
        onClick={() => setSelectedPack(null)}
        className={`self-end font-bold text-teal-800 bg-white px-8 py-2 rounded-xl hover:bg-slate-200 mx-8 mt-8 ${
          !selectedPack && "invisible"
        }`}
      >
        Reset
      </button>
      <p className="text-[4em] font-black pb-16">WHEEL OF FORTUNE</p>
      {selectedPack === null ? (
        <div className="flex flex-col gap-8">
          {wordPackage.map((pack, index) => {
            return (
              <button
                className="bg-teal-700 px-16 py-4 font-bold rounded-xl text-[3em] hover:bg-teal-800 duration-200"
                onClick={() => setSelectedPack(wordPackage[index])}
              >
                ROUND {index + 1}
              </button>
            );
          })}
        </div>
      ) : (
        <div>
          <div className="w-full flex flex-wrap items-center justify-center gap-4">
            {wordList.map((word, index) => {
              return (
                <span
                  key={index}
                  className={`border-4 ${
                    word.char.match(" ") ? "border-teal-600" : "border-white"
                  } min-w-24 min-h-24 flex items-center justify-center text-white font-black text-[3em] ${
                    word.char.match(" ") ? "bg-white" : "bg-teal-900"
                  }`}
                >
                  {word.visible ? word.char : ""}
                </span>
              );
            })}
          </div>
          <div className="w-full flex items-center justify-center gap-4 pt-32">
            <p className="font-black text-[3em]">GUESS: </p>
            <input
              type="text"
              maxLength={1}
              value={guess ? guess : ""}
              onChange={(e) => {
                setGuess(e.target.value.toUpperCase());
              }}
              onBlur={() => checkGuess()}
              className="text-[3em] font-black text-black w-[2em] rounded-xl text-center"
            />
          </div>
        </div>
      )}
      <AlertModal
        status={alert.status}
        message={alert.message}
        open={alert.open}
        setOpen={setAlert}
      />
    </div>
  );
}

export default App;
