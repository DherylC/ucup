import CharacterSelect from "./CharacterSelect";

function Login({setIsLoggedIn, contact, setContact, startTimers }) {

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoggedIn(true);
        startTimers();
    }

    function handleChange(event) {
        const {name, value} = event.target;
        setContact(prev => ({
            ...prev,
            [name]: value
    }));
}

    return(
        <div className="container row centered mx-auto py-5 bg-dark-tp rounded-3">
            <h1 className="fw-bold text-center">Create Character</h1>
            <div className="col-md-6">
                <CharacterSelect />
            </div>
            <div className="col-md-6">
                <form>
                    <div className="mb-3 mt-5">
                        <label className="form-label">Username</label>
                        <input 
                            name="fName"
                            onChange={handleChange}
                            className="form-control mb-2"
                            placeholder="Enter your name"
                            value={contact.fName}
                            required/>
                    </div>
                    <button type="submit" onClick={handleLogin} className="btn btn-warning fw-bolder px-3">Start</button>
                </form>
            </div>
        </div>
    )
};

export default Login;