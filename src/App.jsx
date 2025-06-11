import React, {useState, useEffect, useRef, useLayoutEffect } from "react";
import Login from "./components/Login";
import GreetingName from "./components/GreetingName";
import GreetingTime from "./components/GreetingTime";
import GameTime from "./components/GameTime";
import PlayerStatus from "./components/PlayerStatus";
import Currency from "./components/Currency";
import ActivityButtons from "./components/ActivityButtons";
import Toast from "./components/Toast";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [contact, setContact] = useState({
        fName: "",
    });
    const [isAlive, setIsAlive] = useState(true);
    const [time, setTime] = useState({ hours: 8, minutes: 0 });

    const [hp, setHp] = useState(100);
    const [hunger, setHunger] = useState(50);
    const [hygiene, setHygiene] = useState(60);
    const [mood, setMood] = useState(50);
    const [money, setMoney] = useState(600);

    const [charPos, setCharPos] = useState({ top: 200, left: 200 });
    const cameraRef = useRef(null);
    const keysPressed = useRef({});

    const places = [
        { id: "house",      top: "5%",  left: "5%", width: 120, height: 120, activities: ["sleep", "shower"] },
        { id: "restaurant-1", top: "5%",  left: "20%", width: 120, height: 120, activities: ["eat"] },
        { id: "restaurant-2", top: "90%",  left: "20%", width: 120, height: 120, activities: ["eat"] },
        { id: "restaurant-3", top: "20%",  left: "85%", width: 120, height: 120, activities: ["eat"] },
        { id: "office",     top: "10%",  left: "60%", width: 280, height: 280, activities: ["work", "workLate"] },
        { id: "park",       top: "40%", left: "40%", width: 340, height: 340, activities: ["chat"] },
        { id: "gym",        top: "80%", left: "5%", width: 120, height: 120, activities: ["workout", "chat"] },
        { id: "hospital",   top: "80%", left: "50%", width: 220, height: 220, activities: ["heal"] },
        { id: "casino",     top: "50%", left: "88%", width: 120, height: 120, activities: ["gamble"] },
        { id: "arcade",     top: "65%", left: "88%", width: 120, height: 120, activities: ["play"] },
        { id: "bar",        top: "80%", left: "88%", width: 120, height: 120, activities: ["drink"] }
    ];

    const [toasts, setToasts] = useState([]);
    const showToast = (main, top, className) => {
        const id = Date.now();
        const newToast = { id, main, top, className };
        setToasts((prev) => [...prev, newToast]);
        setTimeout(() => removeToast(id), 2500);
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    const [activePlace, setActivePlace] = useState(null);
    const gameAreaRef = useRef(null);
    const [gameAreaSize, setGameAreaSize] = useState({ width: 1600, height: 1600 });

    useEffect(() => {
    if (!gameAreaRef.current) return;

    const charBox = { x: charPos.left, y: charPos.top, w: 30, h: 30 };

    const collided = places.find(place => {
        const placeBox = {
            x: parseFloat(place.left) / 100 * gameAreaSize.width,
            y: parseFloat(place.top) / 100 * gameAreaSize.height,
            w: place.width,
            h: place.height
        };

        return !(
            charBox.x + charBox.w < placeBox.x ||
            charBox.x > placeBox.x + placeBox.w ||
            charBox.y + charBox.h < placeBox.y ||
            charBox.y > placeBox.y + placeBox.h
        );
    });

    if (collided) {
        setActivePlace(collided);
    } else {
        setActivePlace(null);
    }
    }, [charPos, gameAreaSize, places]);

    useEffect(() => {
        if (!cameraRef.current || !gameAreaRef.current) return;

        const charX = charPos.left + 15;
        const charY = charPos.top + 15;

        const scrollX = charX - cameraRef.current.clientWidth / 2;
        const scrollY = charY - cameraRef.current.clientHeight / 2;

        cameraRef.current.scrollTo({
            top: scrollY,
            left: scrollX,
            behavior: 'smooth'
        });
    }, [charPos]);

    const timeRef = useRef(time);
        
    useEffect(() => {
        timeRef.current = time;
    }, [time]);
        
    useEffect(() => {
        const interval = setInterval(() => {
        setTime(prev => addMinutes(prev, 1));
        }, 1000);
        
        return () => clearInterval(interval);
    }, [setTime]);
        
    const addMinutes = (prevTime, minutesToAdd) => {
        let total = prevTime.hours * 60 + prevTime.minutes + minutesToAdd;
        total = total % (24 * 60);
        return {
            hours: Math.floor(total / 60),
            minutes: total % 60,
        };
    };

    useEffect(() => {
    const intervalRef = { current: null };

    const handleKeyDown = (e) => {
        keysPressed.current[e.key] = true;

        if (!intervalRef.current) {
            intervalRef.current = setInterval(() => {
                setCharPos((prev) => {
                    const CHAR_SIZE = 30;
                    let newTop = prev.top;
                    let newLeft = prev.left;

                    if (keysPressed.current['w']) newTop -= 3;
                    if (keysPressed.current['s']) newTop += 3;
                    if (keysPressed.current['a']) newLeft -= 3;
                    if (keysPressed.current['d']) newLeft += 3;
            
                    const maxTop = gameAreaSize.height - CHAR_SIZE;
                    const maxLeft = gameAreaSize.width - CHAR_SIZE;

                    newTop = Math.max(0, Math.min(maxTop, newTop));
                    newLeft = Math.max(0, Math.min(maxLeft, newLeft));

                    return { top: newTop, left: newLeft };
                });
            }, 8);
        }
    };

        const handleKeyUp = (e) => {
            delete keysPressed.current[e.key];
            if (Object.keys(keysPressed.current).length === 0 && intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            clearInterval(intervalRef.current);
        };
    }, [gameAreaSize]);

    function handleOnSleep(){
        if (time.hours >= 21) {
            setHp(hp + 10);
            setTime({hours: 8, minutes: 0})
            showToast("Successfully slept through the night!", "+10 HP", "bg-success");
        } else if(time.hours < 4){
            setHp(hp + 6);
            setTime({hours: 8, minutes: 0})
            showToast("You took a short nap", "+6 HP", "bg-success");
        } else {
            showToast("You are not in the mood for sleep", "Not night time", "bg-danger");
        }
    }

    function handleOnShower() {
        setHygiene(hygiene + 100);
        setTime(prev => addMinutes(prev, 20));
        showToast("Successfully taken a shower!", "+100 Hygiene", "bg-success");
    }

    function handleOnEat() {
        if (money >= 80) {
            setHunger(hunger + 100);
            setMoney(money - 80);
            setTime(prev => addMinutes(prev, 30))            
            showToast("You ate delicious food!", "-$80, +100 Hunger", "bg-success");
        } else {
            showToast("Not enough money to eat.", "Needed $80", "bg-danger");
        }
    }

    function handleOnPlay() {
        if (time.hours >= 21 || time.hours < 9) {
            showToast("The Arcade is currently closed. Check in later.", "Operates 09:00 - 21:00", "bg-danger");
        } else if (money >= 60) {
                setMood(mood + 50);
                setMoney(money - 60);
                setTime(prev => addMinutes(prev, 60))            
                showToast("The game was fun!", "-$60, +50 Mood", "bg-success");
        } else {
            showToast("Not enough money to play games.", "Needed $60", "bg-danger");
        }
    }

    function handleOnHeal(){
        if (money >= 800) {
            setHp(hp + 100);
            setMood(mood + 20);
            setHunger(hunger + 50);
            setMoney(money - 800);
            setTime(prev => addMinutes(prev, 120))            
            showToast("You feel better", "-$800, +100 HP, +50 Hunger, +20 Mood", "bg-success");
        } else {
            showToast("Not enough money to see doctor.", "Needed $800", "bg-danger");
        }
    }

    function handleOnWork() {
        if (time.hours >= 17 || time.hours < 8) {
            showToast("The office is closed", "Opens 08:00 - 17:00", "bg-danger");
        } else if (time.hours >= 10 && time.hours < 22) {
            showToast("Cannot enter office. You are late for work.", "Check in between 8-10 AM", "bg-danger");
        } else {
            setMoney(money + 350);
            setMood(mood - 10);
            setHp(hp - 2);
            setTime(prev => addMinutes(prev, 480));
            showToast("You worked hard!", "+$350, -10 Mood, -2 HP", "bg-success");
        }
    }

    function handleOnWorkLate() {
        if (time.hours >= 17 || time.hours < 8) {
            showToast("The office is closed", "Opens 08:00 - 17:00", "bg-danger");
        } else if(time.hours >=10 && time.hours < 22) {
            showToast("Cannot enter office. You are late for work.", "Check in between 8-10 AM", "bg-danger");
        } else {
            setMoney(money + 420);
            setMood(mood - 12);
            setHp(hp - 5);
            setTime(prev => addMinutes(prev, 600));
            showToast("You worked extra hard!", "+$420, -12 Mood, -5 HP", "bg-success");
        }
    }

    function handleOnGamble() {
        if (money < 300) {
            showToast("Not enough money to gamble", "Needed $300", "bg-danger");
        } else {
            var x = Math.floor(Math.random() * 100);
            if (x <= 2) {
                setMoney(money + 10000);
                setMood(mood + 100);
                showToast("You won the gamble!", "+$10K, +100 Mood", "bg-success");
            } else {
                setMood(mood - 8);
                setMoney(money - 300);
                showToast("You lost the gamble, of course", "-$300, -8 Mood", "bg-warning");
            }
            setTime(prev => addMinutes(prev, 5));
        }
    };

    function handleOnDrink(){
        if (time.hours >= 19 || time.hours < 5) {
            if (money >= 400) {
                setMood(mood + 80);
                setHp(hp - 5);
                setMoney(money - 400);
                setTime(prev => addMinutes(prev, 300));
                showToast("That was some fine alcohol", "-$400, +80 Mood, -5 HP", "bg-success");
            } else {
                showToast("Not enough money to drink.", "Needed $400", "bg-danger");
            }
        } else {
            showToast("The bar is closed. Check in later.", "Opens 19.00 - 05.00", "bg-danger");
        }
    }

    function handleOnWorkout() {
        if (time.hours >= 21 || time.hours < 10) {
            showToast("The gym is closed", "Opens 10:00 - 21:00", "bg-danger");
        } else if (hp < 40) {
            showToast("You are too tired to work out", "HP too low", "bg-danger");
        } else {
            if(money >= 40){
                setHp(hp + 5);
                setMood(mood + 10);
                setHygiene(hygiene - 40);
                setMoney(money - 40);
                setTime(prev => addMinutes(prev, 120));
                showToast("You worked some sweat", "-$40, +5 HP, +10 Mood, -40 Hygiene", "bg-success");        
            } else {
                showToast("Not enough money to enter gym.", "Needed $40", "bg-danger");
            }
        }
    }

    function handleOnChat() {
        if (time.hours >= 23 || time.hours <= 6) {
            showToast("No one is around. Talking to yourself?", "The place is empty", "bg-danger");
        } else {
            setMood(mood + 8);
            setTime(prev => addMinutes(prev, 35));
            showToast("You had a nice chat.", "+8 Mood", "bg-success");
        }
    }

    const hpRef = useRef(hp);
    const hungerRef = useRef(hunger);
    const hygieneRef = useRef(hygiene);
    const moodRef = useRef(mood);

    useEffect(() => {
        hpRef.current = hp;
        hungerRef.current = hunger;
        hygieneRef.current = hygiene;
        moodRef.current = mood;
    }, [hp, hunger, hygiene, mood]);

    function hpDown() {
        setHp(prev => prev - 1);
    }

    function hungerDown() {
        setHunger(prev => prev - 1);
    }

    function hygieneDown() {
        setHygiene(prev => prev - 1);
    }

    function moodDown() {
        setMood(prev => prev - 1);
    }

    function statusCheck() {
        if (hpRef.current < 1) {
            setIsAlive(false);
            stopTimers();
        }

        if (hungerRef.current <= 0) {
            setHp(prev => prev - 1);
        }

        if (hygieneRef.current <= 0) {
            setHp(prev => prev - 1);
        }

        if (moodRef.current <= 0) {
            setHp(prev => prev - 1);
        }
    }

    function checkForMaxedStats() {
        if (hpRef.current > 100) {
            setHp(100);
            hpRef.current = 100;
        }

        if (hungerRef.current > 100) {
            setHunger(100);
            hungerRef.current = 100;
        } else if (hungerRef.current < 0) {
            setHunger(0);
            hungerRef.current = 0;
        }

        if (hygieneRef.current > 100) {
            setHygiene(100);
            hygieneRef.current = 100;
        } else if (hygieneRef.current < 0) {
            setHygiene(0);
            hygieneRef.current = 0;
        }

        if (moodRef.current > 100) {
            setMood(100);
            moodRef.current = 100;
        } else if (moodRef.current < 0) {
            setMood(0);
            moodRef.current = 0;
        }
    }

    function startTimers() {
        setInterval(hpDown, 6000);
        setInterval(hungerDown, 800);
        setInterval(hygieneDown, 4000);
        setInterval(moodDown, 3200);
        setInterval(statusCheck, 1000);
        setInterval(checkForMaxedStats, 100);
    }

    function stopTimers() {
        clearInterval(hpDown);
        clearInterval(hungerDown);
        clearInterval(hygieneDown);
        clearInterval(moodDown);
        clearInterval(statusCheck);
        clearInterval(checkForMaxedStats);
    }

    function handleRevive() {
        setIsAlive(true);
        setHp(100);
        setHunger(50);
        setHygiene(60);
        setMood(50);
        setMoney(600);
        setTime({ hours: 8, minutes: 0 });
        setCharPos({ top: 200, left: 200 });
        startTimers();
    }

    if (isLoggedIn && isAlive) {
        if(contact.fName === "") contact.fName = "Guest";
        return <React.Fragment>
            <div className="bg-warning pt-3 pb-2 px-5 bg-dark text-light">
                <div className="bg-warning d-inline-block rounded-3 px-3 text-dark fw-bolder">
                    <GreetingTime time={time}/><GreetingName contact={contact}/>
                </div> <span className="fw-bolder mx-1"> | Ucup's New Neighborhood v2.0</span>
                <PlayerStatus   hp={hp} 
                                hunger={hunger} 
                                hygiene={hygiene} 
                                mood={mood}/>
            </div>
            <div className="row g-0">
                <div className="col-sm-9" style={{ position: 'relative', height: '84.2vh', backgroundColor: '#fff9c4', overflow: 'hidden' }}>
                    <div style={{ width: '100%', height: '86vh', overflow: 'scroll'}} ref={cameraRef}>
                        <div className="display-area" ref={gameAreaRef} style={{ position: 'relative', width: '1600px', height: '1600px' }}>
                            <div id="character" style={{ position: 'absolute', top: charPos.top, left: charPos.left, width: 50, height: 50, backgroundColor: 'red' }} />
                            {places.map(place => (
                                <div key={place.id} id={place.id} className="place"
                                    style={{ position: 'absolute', top: place.top, left: place.left, width: place.width, height: place.height }}>
                                </div>
                            ))}
                        </div>
                    </div>               
                </div>
                <div className="col-sm-3 text-center bg-dark">
                    <Currency money={money} setMoney={setMoney}/>
                    <GameTime time={time} setTime={setTime}/>
                    <div className="m-3 px-4 pt-3 pb-2 rounded bg-light text-start">
                        <h5>Current Location</h5>
                            {activePlace ? (
                                <h3 className="fw-bolder">{activePlace.id.charAt(0).toUpperCase() + activePlace.id.slice(1)}</h3>
                            ) : (
                                <h3 className="fw-bolder">-</h3>
                            )}
                    </div>
                    <div className="px-3 py-2 rounded text-light fw-bolder">
                        Activities
                        <ActivityButtons    visibleButtons={activePlace ? activePlace.activities : []}
                                            onSleep     = {() => handleOnSleep()}
                                            onShower    = {() => handleOnShower()}
                                            onEat       = {() => handleOnEat()}
                                            onWork      = {() => handleOnWork()}
                                            onChat      = {() => handleOnChat()}
                                            onWorkout   = {() => handleOnWorkout()}
                                            onHeal      = {() => handleOnHeal()}
                                            onGamble    = {() => handleOnGamble()}
                                            onPlay      = {() => handleOnPlay()}
                                            onDrink     = {() => handleOnDrink()}
                                            onWorkLate  = {() => handleOnWorkLate()}/>
                    </div>
                </div>
                <Toast toasts={toasts} removeToast={removeToast}/>
            </div>
        </React.Fragment>;
    } if(isLoggedIn && !isAlive) {
        return <div className="login-bg">
            <div className="text-light container row centered mx-auto py-5 bg-dark-tp rounded-3 text-center">
                <h1 className="fw-bolder mb-2">You Died.</h1>
                <h5 className="mb-5">Please take a good care of yourself.</h5>
                <button className="btn btn-warning fw-bolder" onClick={handleRevive}>Revive</button>
            </div>
        </div>
    } else {
        return <div className="login-bg text-light">
            <Login   setIsLoggedIn={setIsLoggedIn} 
                        contact={contact}
                        setContact={setContact}
                        startTimers={startTimers}/>
        </div>;
    }
}

export default App;