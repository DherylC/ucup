import React, {useState} from "react";

function Counter(){
    var [count, setCount] = useState(0);

    function increment(){
        setCount(count + 1);
    }

    function decrement(){
        setCount(count - 1);
    }

    function double(){
        setCount(count * 2);
    }

    return <React.Fragment>
        <div className="text-center mt-5 py-3">
            <h2>Counter</h2>
            <h1 className="fw-bolder py-3 text-huge">{count}</h1>
            <div>
                <button className="btn btn-warning mx-1" onClick={increment}>+ 1</button>
                <button className="btn btn-warning mx-1" onClick={decrement}>- 1</button>
                <button className="btn btn-warning mx-1" onClick={double}>x 2</button>
            </div>
        </div>
    </React.Fragment>
}

export default Counter;