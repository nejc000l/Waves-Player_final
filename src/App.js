import React, {useState,useRef} from 'react';
import './styles/App.scss'
import Player from './components/Player'
import Song from './components/Song'
import data from './data';
import Library from './components/Library'
import Nav from './components/Nav'



function App() {
  //ref 
const audioRef = useRef(null)
  //states
const [libraryStatus,setLibraryStatus] = useState(false)
const [songs,setSongs] = useState(data());
const [currentSong,setCurrentSong] = useState(songs[0])
const [isPlaying,setIsPlaying] = useState(false)
const[songInfo, setSongInfo]=useState({
    currentTime:0,
    duration: 0,
    animationPercentage: 0,
})

const timeUpdateHandler =(e)=>{
const current = e.target.currentTime;
const duration = e.target.duration
// calculate percantage

const roundedCurrent = Math.round(current);
const roundedDuration = Math.round(duration);
const animation = Math.round((roundedCurrent/roundedDuration)*100);



setSongInfo({...songInfo, currentTime:current, duration:duration, animationPercentage:animation})   
}
const songEndHandler = async () =>{
  let currentIndex = songs.findIndex((song)=>song.id === currentSong.id);
        
  await setCurrentSong(songs[(currentIndex +1) % songs.length]);
  if(isPlaying === true) audioRef.current.play();
}
return (
    <div className={`App ${libraryStatus ? 'library-active' : "" }`}>
    

        <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
        <Song currentSong={currentSong}/>
        <Player 
            setSongInfo={setSongInfo}
            songInfo={songInfo}
            audioRef={audioRef}
            currentSong={currentSong}
            setIsPlaying={setIsPlaying}
            isPlaying ={isPlaying}
            songs={songs}
            setCurrentSong={setCurrentSong}
            setSongs={setSongs}
            
        
        />
        <Library 
            audioRef={audioRef}
            songs={songs} 
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
            isPlaying={isPlaying}
            setSongs={setSongs}
            libraryStatus={libraryStatus}
            />

    <audio 
        onTimeUpdate={timeUpdateHandler} 
        onLoadedMetadata ={timeUpdateHandler}
        ref={audioRef} 
        src={currentSong.audio}
        onEnded={songEndHandler}
        >
    </audio>
    </div>
  );
}

export default App;