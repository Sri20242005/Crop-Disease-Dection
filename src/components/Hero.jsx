import { useState } from "react";
import axios from "axios";
import hero from "../assets/hero.png";
import "../styles/Hero.css";

function Hero() {

    const [image, setImage] = useState(null);
    const [prediction, setPrediction] = useState("");
    const [confidence, setConfidence] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setImage(file);

        setPrediction("");
        setConfidence("");
    };

    const handlePredict = async () => {

        if (!image) {
            alert("Please select an image first.");
            return;
        }

        try {

            setLoading(true);

            const formData = new FormData();

            formData.append("file", image);

            const response = await axios.post(
                "http://127.0.0.1:8000/predict",
                formData
            );

            setPrediction(response.data.prediction);
            setConfidence(response.data.confidence);

        }
        catch (err) {

            console.log(err);

            alert("Prediction failed.");

        }
        finally {

            setLoading(false);

        }

    };

    return (

        <section className="hero">

            <div className="hero-text">

                <h1>AI Powered Crop Disease Detection</h1>

                <p>
                    Upload a crop leaf image and detect diseases instantly using
                    Artificial Intelligence.
                </p>

                <div className="upload-box">

                    <input
                        type="file"
                        id="fileUpload"
                        hidden
                        accept="image/*"
                        onChange={handleFileChange}
                    />

                    <label
                        htmlFor="fileUpload"
                        className="browse-btn"
                    >
                        📂 Browse Files
                    </label>

                    <button
                        className="detect-btn"
                        onClick={handlePredict}
                    >
                        {loading ? "Detecting..." : "Detect Disease"}
                    </button>

                </div>

                {prediction && (

                    <div
                        style={{
                            marginTop: "30px",
                            background: "#f5f5f5",
                            padding: "20px",
                            borderRadius: "10px"
                        }}
                    >

                        <h2>Prediction</h2>

                        <h3>{prediction}</h3>

                        <p>
                            Confidence :
                            {" "}
                            {Number(confidence).toFixed(4)}
                        </p>

                    </div>

                )}

            </div>

            <div className="hero-image">
                <img
                    src={hero}
                    alt="Crop Disease Detection"
                />
            </div>

        </section>

    );
}

export default Hero;