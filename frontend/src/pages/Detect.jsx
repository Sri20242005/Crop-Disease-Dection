import React, { useState } from "react";
import axios from "axios";

function Detect() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [prediction, setPrediction] = useState("");
    const [confidence, setConfidence] = useState("");
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        console.log("Image selected");

        const file = e.target.files[0];

        if (!file) {
            alert("No image selected");
            return;
        }

        console.log(file);

        setImage(file);
        setPreview(URL.createObjectURL(file));

        setPrediction("");
        setConfidence("");
    };

    const handlePredict = async () => {
        if (!image) {
            alert("Please choose an image first.");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("file", image);

            const response = await axios.post(
                "http://127.0.0.1:8000/predict",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log(response.data);

            setPrediction(response.data.prediction);
            setConfidence(response.data.confidence);
        } catch (error) {
            console.error(error);

            if (error.response) {
                alert("Backend Error: " + JSON.stringify(error.response.data));
            } else {
                alert("Cannot connect to backend.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                width: "80%",
                margin: "40px auto",
                textAlign: "center",
            }}
        >
            <h1>🌾 Paddy Disease Detection</h1>

            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
            />

            <br />
            <br />

            {preview && (
                <img
                    src={preview}
                    alt="Preview"
                    style={{
                        width: "300px",
                        borderRadius: "10px",
                        border: "1px solid #ccc",
                    }}
                />
            )}

            <br />
            <br />

            <button
                onClick={handlePredict}
                style={{
                    padding: "10px 30px",
                    cursor: "pointer",
                    fontSize: "16px",
                }}
            >
                {loading ? "Predicting..." : "Predict"}
            </button>

            <br />
            <br />

            {prediction && (
                <div>
                    <h2>Prediction</h2>

                    <h3>{prediction}</h3>

                    <p>
                        <strong>Confidence:</strong>{" "}
                        {Number(confidence).toFixed(4)}
                    </p>
                </div>
            )}
        </div>
    );
}

export default Detect;