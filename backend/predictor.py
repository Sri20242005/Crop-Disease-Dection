import onnxruntime as ort
import numpy as np
from PIL import Image

# Load model
session = ort.InferenceSession("model/student.onnx")

input_name = session.get_inputs()[0].name
output_name = session.get_outputs()[0].name

# Replace these with your actual class names later
classes = [
    "Class 0",
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
    "Class 5",
    "Class 6",
    "Class 7",
    "Class 8",
    "Class 9",
]

def preprocess(image):
    image = image.resize((128, 128))
    image = np.array(image).astype(np.float32)

    image = image / 255.0

    image = np.transpose(image, (2, 0, 1))

    image = np.expand_dims(image, axis=0)

    return image


def predict(image):

    input_tensor = preprocess(image)

    outputs = session.run(
        [output_name],
        {input_name: input_tensor}
    )

    logits = outputs[0]

    pred = int(np.argmax(logits))

    confidence = float(np.max(logits))

    return {
        "prediction": classes[pred],
        "class_index": pred,
        "confidence": confidence
    }