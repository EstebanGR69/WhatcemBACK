import express from "express";
import * as WhatsAppOficialWebhookController from "../controllers/WhatsAppOficialWebhookController";

const webhookRoutes = express.Router();

// Esta es la ruta que coincide con la URL de tu base de datos
webhookRoutes.post("/webhook/:companyId/:connectionId", WhatsAppOficialWebhookController.store);

export default webhookRoutes;