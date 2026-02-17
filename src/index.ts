import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import laborRoutes from './routes/laborRoutes';
import authRoutes from './routes/authRoutes';
import budgetRoutes from './routes/budgetRoutes';
import { ProjectService } from './services/projectService';
import path from 'path';

// Initialize environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api/labor', laborRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/budget', budgetRoutes);

// Project List Route
app.get('/api/projects', async (req: Request, res: Response) => {
  try {
    const projects = await ProjectService.listProjects();
    res.json(projects);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch projects', details: error.message });
  }
});

// Basic Route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the Procore API Gateway' });
});

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
