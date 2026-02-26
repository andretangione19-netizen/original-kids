export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { name, orderId, total } = req.body;

  return res.status(200).json({
    success: true,
    message: `Pedido ${orderId} criado com sucesso para ${name}. Total R$ ${total}`
  });
}
