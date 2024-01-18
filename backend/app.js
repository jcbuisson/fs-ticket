import express from 'express'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()


app.use(express.json())

app.get('/api/ticket', async (req, res) => {
   const ticketList = await prisma.Ticket.findMany({})
   console.log('GET /api/ticket', ticketList)
   res.send(ticketList)
})

app.get('/api/ticket/:id', async (req, res) => {
   const ticket = await prisma.Ticket.findUnique({
      where: { id: parseInt(req.params.id) }
   })
   console.log(`GET /api/ticket ${ticket.id}`, ticket)
   res.send(ticket)
})

app.post('/api/ticket', async (req, res) => {
   const ticket = await prisma.Ticket.create({
      data: req.body
   })
   console.log('POST /api/ticket', ticket)
   res.send(ticket)
})

app.post('signin', async (req, res) => {
   
})

app.listen(3000, function() {
   console.log('listening to port 3000')
})
