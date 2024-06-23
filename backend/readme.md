# IDCV Gigs backend

The following are the steps I followed in order to create the backend for idcv gigs backend. This is made using Nodejs. We are using Neon DB, a serverless postgres db. Express js is our backend framework and we are using sequelise as our orm.

### Step 1: Creating Project Directory

we are creating a directory for our projec and initializing our npm module

```bash
mkdir backend
cd backend
npm init -y
```

### Step 2:

In step 2, we will install the npm libraries needed

```bash
npm install express pg sequelize dotenv body-parser
```

- `express js`: A web framework for Node.js.
- `pg`: PostgreSQL client for Node.js.
- `sequelize`: A promise-based Node.js ORM for PostgreSQL.
- `dotenv`: Module to load environment variables from a `.env` file.
- `body-parser`: Middleware to parse incoming request bodies.

### Step 3:  Environment Variables

we are creating a `.env` file in the root directory of project and update it with our database connection string:

```env
DATABASE_URL=<your db url>
```

### Step 4:  Sequelize

we will be creating a config`directory and a`database.js` file to setup Sequelize:

```bash
mkdir config
touch config/database.js
```

The following is the code content that needed to be added to`config/database.js`:

```javascript
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

module.exports = sequelize;
```

### Step 5: Define Models

we will create a `models` directory and define our models:

```bash
mkdir models
touch models/Job.js models/Application.js
```

we can add the following content to `models/Job.js`:

```javascript
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Job = sequelize.define('Job', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  salary: {
    type: DataTypes.STRING,
    allowNull: false
  },
  employer: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = Job;
```

we can add the following content to `models/Application.js`:

```javascript
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  jobId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  applicant: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = Application;
```

### Step 6: Creating Express App

lets create `app.js` file in the root directory:

```bash
touch app.js
```

lets add the following content to `app.js`:

```javascript
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const Job = require('./models/Job');
const Application = require('./models/Application');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Job Portal API');
});

// Create a job
app.post('/jobs', async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all jobs
app.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.findAll();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a job by ID
app.get('/jobs/:id', async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Apply for a job
app.post('/jobs/:id/applications', async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    const application = await Application.create({
      jobId: req.params.id,
      applicant: req.body.applicant
    });
    res.status(201).json(application);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all applications for a job
app.get('/jobs/:id/applications', async (req, res) => {
  try {
    const applications = await Application.findAll({
      where: { jobId: req.params.id }
    });
    res.status(200).json(applications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Sync database and start server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
```

### Step 7: Start the Server

Now we can start the server using the following command:

```bash
node app.js
```

### Step 8: Test the API

below are example requests that can be written in order to test our application , you can use postman to import this and test:

1. **Create a Job**:

   ```bash
   curl -X POST http://localhost:3000/jobs -H "Content-Type: application/json" -d '{
     "title": "Smart Contract Engineer",
     "description": "Develop and maintain smart contracts.",
     "salary": "$100,000",
     "employer": "IDCV"
   }'
   ```
2. **Get All Jobs**:

   ```bash
   curl http://localhost:3000/jobs
   ```
3. **Get a Job by ID**:

   ```bash
   curl http://localhost:3000/jobs/1
   ```
4. **Apply for a Job**:

   ```bash
   curl -X POST http://localhost:3000/jobs/1/applications -H "Content-Type: application/json" -d '{
     "applicant": "Sudharsanan"
   }'
   ```
5. **Get All Applications for a Job**:

   ```bash
   curl http://localhost:3000/jobs/1/applications
   ```
