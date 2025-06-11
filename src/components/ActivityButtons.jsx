export default function ActivityButtons({ visibleButtons, ...handlers }) {
    const allButtons = {
        sleep:      <button className="btn btn-warning rounded-3 w-100 fw-bolder mt-1" onClick={handlers.onSleep}>Sleep</button>,
        shower:     <button className="btn btn-warning rounded-3 w-100 fw-bolder mt-1" onClick={handlers.onShower}>Shower</button>,
        eat:        <button className="btn btn-warning rounded-3 w-100 fw-bolder mt-1" onClick={handlers.onEat}>Eat ($80)</button>,
        work:       <button className="btn btn-warning rounded-3 w-100 fw-bolder mt-1" onClick={handlers.onWork}>Work (+$350)</button>,
        workLate:   <button className="btn btn-warning rounded-3 w-100 fw-bolder mt-1" onClick={handlers.onWorkLate}>Work Late (+$420) </button>,
        chat:       <button className="btn btn-warning rounded-3 w-100 fw-bolder mt-1" onClick={handlers.onChat}>Chat</button>,
        workout:    <button className="btn btn-warning rounded-3 w-100 fw-bolder mt-1"onClick={handlers.onWorkout}>Workout ($40)</button>,
        heal:       <button className="btn btn-warning rounded-3 w-100 fw-bolder mt-1"onClick={handlers.onHeal}>Doctor ($800)</button>,
        gamble:     <button className="btn btn-warning rounded-3 w-100 fw-bolder mt-1"onClick={handlers.onGamble}>Gamble ($300)</button>,
        play:       <button className="btn btn-warning rounded-3 w-100 fw-bolder mt-1"onClick={handlers.onPlay}>Play ($60)</button>,
        drink:      <button className="btn btn-warning rounded-3 w-100 fw-bolder mt-1"onClick={handlers.onDrink}>Drink ($400)</button>
    };

    return (
        <div>
        {visibleButtons.map(key => (
            <div key={key}>{allButtons[key]}</div>
        ))}
        </div>
    );
}
