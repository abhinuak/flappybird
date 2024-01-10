import styled from "styled-components";
import { useEffect, useState } from "react";
import "./App.css"
const BIRD_HEIGHT = 38;
const BIRD_WIDTH = 48;
const WALL_HEIGHT = 520;
const WALL_WIDTH = 400;
const GRAVITY = 8;
const OBJ_WIDTH = 52;
const OBJ_SPEED = 9;
const OBJ_GAP = 200;
function App() {
  const [isStart, setIsStart] = useState(false);
  const [birdpos, setBirspos] = useState(300);
  const [objHeight, setObjHeight] = useState(0);
  const [objPos, setObjPos] = useState(WALL_WIDTH);
  const [score, setScore] = useState(0);
  useEffect(() => {
    let intVal;
    if (isStart && birdpos < WALL_HEIGHT - BIRD_HEIGHT) {
      intVal = setInterval(() => {
        setBirspos((birdpos) => birdpos + GRAVITY);
      }, 24);
    }
    return () => clearInterval(intVal);
  });

  useEffect(() => {
    let objval;
    if (isStart && objPos >= -OBJ_WIDTH) {
      objval = setInterval(() => {
        setObjPos((objPos) => objPos - OBJ_SPEED);
      }, 24);

      return () => {
        clearInterval(objval);
      };
    } else {
      setObjPos(WALL_WIDTH);
      setObjHeight(Math.floor(Math.random() * (WALL_HEIGHT - OBJ_GAP)));
      if (isStart) setScore((score) => score + 1);
    }
  }, [isStart, objPos]);

  useEffect(() => {
    let topObj = birdpos >= 0 && birdpos < objHeight;
    let bottomObj =
      birdpos <= WALL_HEIGHT &&
      birdpos >=
        WALL_HEIGHT - (WALL_HEIGHT - OBJ_GAP - objHeight) - BIRD_HEIGHT;

    if (
      objPos >= OBJ_WIDTH &&
      objPos <= OBJ_WIDTH + 80 &&
      (topObj || bottomObj)
    ) {
      setIsStart(false);
      setBirspos(300);
      setScore(0);
    }
  }, [isStart, birdpos, objHeight, objPos]);
  const handler = () => {
    if (!isStart) setIsStart(true);
    else if (birdpos < BIRD_HEIGHT) setBirspos(0);
    else setBirspos((birdpos) => birdpos - 50);
  };
  return (
    <Home onClick={handler}>
          
      <Background height={WALL_HEIGHT} width={WALL_WIDTH}>
      <span style={{margin:'150px'}}><b className="boldd">Score:<span className="scor">{score}</span></b> </span>

        {!isStart ? <Startboard>Click To Start</Startboard> : null}
        <Obj
          height={objHeight}
          width={OBJ_WIDTH}
          left={objPos}
          top={0}
          deg={180}
        />
        <Bird
          height={BIRD_HEIGHT}
          width={BIRD_WIDTH}
          top={birdpos}
          left={100}
        />
        <Obj
          height={WALL_HEIGHT - OBJ_GAP - objHeight}
          width={OBJ_WIDTH}
          left={objPos}
          top={WALL_HEIGHT - (objHeight + (WALL_HEIGHT - OBJ_GAP - objHeight))}
          deg={0}
        />
             

      </Background>
    </Home>
  );
}

export default App;

const Home = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Background = styled.div`
  background-image: url("https://cdn.wallpapersafari.com/18/84/kFg5GT.jpg");
  background-repeat: no-repeat;
  background-size: ${(props) => props.width}px ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  position: relative;
  overflow: hidden;
  border: 2px solid black;
`;

const Bird = styled.div`
  position: absolute;
  background-image: url("https://media.geeksforgeeks.org/wp-content/uploads/20231211115925/flappy_bird_by_jubaaj_d93bpnj.gif");
  background-repeat: no-repeat;
  background-size: ${(props) => props.width}px ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
`;

const Obj = styled.div`
  position: relative;
  background-image: url("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISDxUPEhIVFRUVFRUVFRUVFRUVFRUVFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NFQ8PFSsZFRkrKystLSstLSstKysrLSs3NzctNysrNy0tKy0rLSs3Ky0tKy0tLS0rLSsrNystKy0rLf/AABEIALgBEQMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAABAAIDBv/EABwQAQEBAQACAwAAAAAAAAAAAAABEQIS8GFxkf/EABgBAQEBAQEAAAAAAAAAAAAAAAABAgcF/8QAFhEBAQEAAAAAAAAAAAAAAAAAAAER/9oADAMBAAIRAxEAPwD2eNRQ45a95EFAmQQxAlGQRSGQ4cTQGHFOUDFYpDiIIVhwBiKwiCwWNYpF0ZwY0k1WbBjSNVkNBdADgxQBpnVVAs2qANVkBnyjqBg6IYoWpBClDrUUMZFIcMMiaiakWGJqJRFBLTFgi1IoIFLqCIoUYCk0AaGKoGFGjNgsaC6rGBus2Lqsixqs1dUaLTQ0BLPlAxGpBDKI1I1BGozQxqCRqJRQ4jIzqI4sMiIiIcESSQKSBJJBJACMKxdAliUGBqhFFgxoKMs1sVWmGa2LFVzoxqhuDKaS6MRqRmNyJUMjUgkbxmikaghjKGEFAlkohQKoiEgUIsAoFBJagSSBAhRArQAwiiioiqrNZrQrUVihqsVpV+JIGZG4zy0tQxuMxrWKNEQsosIMEMSSBSQiSQKqJIqSQiSSiWJUEkgQKFGpDQQNCqGa1QqsVmt2M2NRWMTWoVnmtRiNxajcLMajNRqFlplCtBERBBJJBJICDgAoICggSSBJEAkgQIBAhVgZrTNWKzWdaZrUVIJVZjcc+a3FqNxqMStSsUaITKNEIQkIQoaUEhqApLQSSBJIEkAKGrQOjSASQoqFSqg0U1mqorNNZrcVJnfcQCNSufLcao3K3K5xqMUbhjMp1lGiNWoEhCFJCJJIpCQh1BAcBAJLUBAQpGpKLVoQLRUNVUzTazasUVmq1m1uCQ33AqsytyucrUrVjLrK1K5StxixXSGViVrWaNQsw6ziNSnWYkGtQhEUpZQNIICghCEUUJalEkAIC1Qs6kKtFqtZWRVazarWbWpBVnVazem4FM6lwYlalc2o1iOmtSucMrNg7StSuM6blYsV0la1z0ys4NnWdSYjcTJ0Dp0JA6WcURDp0agOjQlDqGiilaFoLQqNVTotGs2rg1rFqtZtakVWgWs2tSCoVrNaRrfcLG/aMGZSxqnTWI66XJqdJg6mVzlMrOK6yta5SnWcHaVa56dTB00yufkdSwdFKxp1MG9WsadTEaWs6tMGtWsVaYNLWdHkuK3o1nRpg1o1nRq4rV6Z1m0VrA3pnyWsrgfJm0stRENWiqFMpRk4kqJqJIGNJIE6kg1KkkGpTqTKnTqSYLVqRgtWpGC0akYK0WpLgNWhAtFqSgBSwZoqSgtZvSSgtFqTSDakhX//2Q==");
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
  transform: rotate(${(props) => props.deg}deg);
`;

const Startboard = styled.div`
  position: relative;
  top: 49%;
  background-color: black;
  padding: 10px;
  width: 100px;
  left: 50%;
  margin-left: -50px;
  text-align: center;
  font-size: 20px;
  border-radius: 10px;
  color: red;
  font-weight: 600;
`;

const ScoreShow = styled.div`
  text-align: center;
  background: transparent;

`;