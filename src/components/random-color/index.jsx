import React, { useEffect, useState } from "react";

export default function RandomColor() {
    const [typeOfColor, setTypeOfColor] = useState("hex");
    const [color, setColor] = useState("#000000");

    function randomColorUtility(length) {
        return Math.floor(Math.random() * length);
    }

    function handleCreateRandomHEX() {
        const hex = [1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
        let hexColor = "#";
        for (let i = 0; i < 6; i++) {
            hexColor += hex[randomColorUtility(hex.length)];
        }
        setColor(hexColor); // ✅ update state
    }

    function handleCreateRandomRGB() {
        const r = randomColorUtility(256);
        const g = randomColorUtility(256);
        const b = randomColorUtility(256);
        setColor(`rgb(${r}, ${g}, ${b})`);
    }

    useEffect(() => {
        if (typeOfColor === 'hex') {
            handleCreateRandomHEX();
        } else {
            handleCreateRandomRGB();
        }
    }, [typeOfColor]);
    return (
        <div style={{
            width: "100vw",
            height: "100vh",
            background: color,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        }}>
            {/* Button Row */}
            <div style={{
                display: "flex",
                gap: "10px",
                marginBottom: "20px"
            }}>
                <button onClick={() => setTypeOfColor('hex')}>Create HEX Color</button>
                <button onClick={() => setTypeOfColor('rgb')}>Create RGB Color</button>
                <button onClick={typeOfColor === 'hex' ? handleCreateRandomHEX : handleCreateRandomRGB}>
                    Generate Random Color
                </button>
            </div>
    
            {/* Color Display */}
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                fontSize: "40px"
            }}>
                <h3>{typeOfColor.toUpperCase()}</h3>
                <h1>{color}</h1>
            </div>
        </div>
    );
    
}
