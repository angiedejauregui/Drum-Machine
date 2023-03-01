import { useEffect, useState } from "react";
import "./App.css";

const drumPads = [
  {
    name: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    keyCode: 81,
    keyTrigger: "Q",
  },
  {
    name: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    keyCode: 87,
    keyTrigger: "W",
  },
  {
    name: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    keyCode: 69,
    keyTrigger: "E",
  },
  {
    name: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    keyCode: 65,
    keyTrigger: "A",
  },
  {
    name: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    keyCode: 83,
    keyTrigger: "S",
  },
  {
    name: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    keyCode: 68,
    keyTrigger: "D",
  },
  {
    name: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    keyCode: 90,
    keyTrigger: "Z",
  },
  {
    name: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    keyCode: 88,
    keyTrigger: "X",
  },
  {
    name: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    keyCode: 67,
    keyTrigger: "C",
  },
];

const App = () => {
  const [name, setName] = useState("");
  const [power, setPower] = useState(false);
  const [volume, setVolume] = useState(1);
  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      playSound(event.key.toUpperCase());
      setKeyVolume();
    });
  }, [volume]);

  function playSound(selector) {
    const audio = document.getElementById(selector);
    audio.play();
    audio.volume = volume;
    activateKey(audio);
    desactivateKey(audio);
    switch (selector) {
      case "Q":
        return setName("Heater-1");
        break;
      case "W":
        return setName("Heater-2");
        break;
      case "E":
        return setName("Heater-3");
        break;
      case "A":
        return setName("Heater-4");
        break;
      case "S":
        return setName("Clap");
        break;
      case "D":
        return setName("Open-HH");
        break;
      case "Z":
        return setName("Kit-n'-Hat");
        break;
      case "X":
        return setName("Kit");
        break;
      case "C":
        return setName("Closed-HH");
        break;
    }
  }

  function stop() {
    setPower(!power);
  }

  function setKeyVolume() {
    const audios = drumPads.map((drumPad) =>
      document.getElementById(drumPad.key)
    );
    audios.forEach((audio) => {
      if (audio) {
        audio.volume = volume;
      }
    });
  }

  function activateKey(audio) {
    if (power) {
      audio.parentElement.style.backgroundColor = "rgb(254, 128, 1)";
      audio.parentElement.style.color = "rgb(254, 128, 1)";
      audio.parentElement.style.boxShadow =
        "1px 1px 1px 3px #161616, inset 0 0 10px 1px rgb(254, 128, 1)";
      audio.parentElement.style.transform = "translate(3px, 3px)";
    }
  }
  function desactivateKey(audio) {
    if (power) {
      setTimeout(() => {
        audio.parentElement.style.backgroundColor = "rgb(39, 39, 39)";
        audio.parentElement.style.color = "rgb(55, 55, 55)";
        audio.parentElement.style.boxShadow = "3px 3px 1px 3px #0e0e0e";
        audio.parentElement.style.transform = "none";
      }, 300);
    }
  }

  return (
    <div className="App">
      <div id="drum-machine">
        <div id="hola" className="controls d-flex justify-content-between">
          <div className={"name-volume" + (power ? " on" : "")}>
            <div id="display">{name}</div>
            <div className="volume">
              Volume: {volume === 1 ? 50 : Math.round(volume * 100)}%
            </div>
          </div>
          <div className="volume-power">
            <div className="icon-volume">
              <i className="fa fa-volume-down fa-lg"></i>
              <input
                className="slider"
                max="1"
                min="0"
                step="0.01"
                type="range"
                volume={volume}
                onChange={(e) => setVolume(e.target.value)}
              />
            </div>
            <button className="btn" id="power" onClick={stop} power={power}>
              <i className="fa fa-power-off fa-lg"></i>
            </button>
          </div>
        </div>

        <div className="drum-pads">
          {drumPads.map((drumPad) => (
            <div
              key={drumPad.name}
              onClick={() => {
                playSound(drumPad.keyTrigger);
              }}
              className="drum-pad"
              id={drumPad.name}
            >
              {drumPad.keyTrigger}
              {power ? (
                <audio
                  className="clip"
                  id={drumPad.keyTrigger}
                  src={drumPad.url}
                ></audio>
              ) : (
                <audio className="clip" id={drumPad.keyTrigger} src="#"></audio>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
