import React, { useState, useEffect } from "react";

export default function CharacterSelect({ setCharacter }) {

    useEffect(() => {
        const defaultCharacter = characters[0];
        setSelectedCharacter(defaultCharacter);
        setImgSrc(`images/${defaultCharacter}.png`);
    }, []);

    const [selectedCharacter, setSelectedCharacter] = useState("");
    const [imgSrc, setImgSrc] = useState("");
    const characters = ["char1", "char2", "char3"];

    function handlePrev(){
        const currentIndex = characters.indexOf(selectedCharacter);
        const prevIndex = (currentIndex - 1 + characters.length) % characters.length;
        setSelectedCharacter(characters[prevIndex]);
        setImgSrc(`images/${characters[prevIndex]}.png`);
    }

    function handleNext(){
        const currentIndex = characters.indexOf(selectedCharacter);
        const nextIndex = (currentIndex + 1 + characters.length) % characters.length;
        setSelectedCharacter(characters[nextIndex]);
        setImgSrc(`images/${characters[nextIndex]}.png`);
    }

    return (
        <div className="text-center py-3">
            <h4>Select Avatar</h4>
            <div className="d-flex justify-content-center align-items-center">
                <button onClick={handlePrev} className="btn btn-warning">&lt;</button>
                <img className="charselect img-fluid" src={imgSrc}></img>
                <button onClick={handleNext} className="btn btn-warning">&gt;</button>
            </div>
        </div>
    );
}