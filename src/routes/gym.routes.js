import { Router } from 'express';

const router = Router();

router.get("/gym", (req, res) => {
  res.send('Gym API is working!');
});

router.get("/gym/:id", (req, res) => {
  res.send(`Socio ${id}`);
});

router.post("/gym/:id", (req, res) => {
    res.send(`Socio ${id} added`);
});

router.put("/gym/:id", (req, res) => {
    res.send(`Socio ${id} updated`);
});

router.delete("/gym/:id", (req, res) => {
    res.send(`Socio ${id} deleted`);
});


export default router;