import express from "express";

const n8nRoutes = express.Router();

n8nRoutes.get("/n8n/",async (req , res) => {
    
    res.status(200).json({
        message:"Ya accediste a la ruta",
        status:200
    })
});

n8nRoutes.post("/n8n/",async (req , res) => {
    res.status(200).json({
        message:"Ya accediste a la ruta",
        status:200
    })
});

n8nRoutes.put("/n8n/",async (req , res) => {
    res.status(200).json({
        message:"Ya accediste a la ruta",
        status:200
    })
});

n8nRoutes.delete("/n8n/",async (req , res) => {
    res.status(200).json({
        message:"Ya accediste a la ruta",
        status:200
    })
});


export default n8nRoutes;