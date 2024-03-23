export const calculator = (req, res) => {
  const { num1, num2, operation } = req.body;

  if (typeof num1 !== "number" || typeof num2 !== "number") {
    return res.status(400).send({ error: "Both operands must be numbers" });
  }

  let result;
  switch (operation) {
    case "add":
      result = num1 + num2;
      break;
    case "subtract":
      result = num1 - num2;
      break;
    case "multiply":
      result = num1 * num2;
      break;
    case "divide":
      // Validación para asegurarse de que no se divida por cero
      if (num2 === 0) {
        return res.status(400).send({ error: "Cannot divide by zero" });
      }
      result = num1 / num2;
      break;
    default:
      return res.status(400).send({
        error:
          "Invalid or unsupported operation. Use subtract, multiply, or divide.",
      });
  }
  res.json({ result });
};
