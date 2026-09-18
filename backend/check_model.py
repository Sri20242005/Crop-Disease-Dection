import onnx

model = onnx.load("model/student.onnx")

print("===== INPUTS =====")
for inp in model.graph.input:
    print(inp)

print("\n===== OUTPUTS =====")
for out in model.graph.output:
    print(out)