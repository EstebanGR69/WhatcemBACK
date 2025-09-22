// En un archivo nuevo: src/controllers/WhatsAppOficialWebhookController.ts
import { Request, Response } from "express";

export const store = async (req: Request, res: Response): Promise<Response> => {
  const { companyId, connectionId } = req.params;
  const payload = req.body; // Aquí vienen los datos de Gupshup

  console.log(`Webhook de WhatsApp Oficial RECIBIDO para compañía: ${companyId}`);
  console.log("Datos del mensaje de Gupshup:", payload);

  // Aquí va tu lógica para procesar el mensaje entrante

  return res.status(200).json({ message: "ok" });
};