
// // supervisorMasterRoutes.js
// const express = require('express');
// // const { getSupervisors,  } = require('../controllers/supervisorMasterController');
// const supervisorMasterController = require('../controllers/supervisorMasterController');
// const { getSupervisors,updateSupervisor,deleteSupervisor} = require('../controllers/supervisorMasterController');
// const router = express.Router();


// router.get('/', getSupervisors);

// router.put('/:id', updateSupervisor);


// router.delete('/:id', deleteSupervisor);

// module.exports = router;


// supervisorMasterRoutes.js
const express = require('express');
// const { getSupervisors,  } = require('../controllers/supervisorMasterController');
const { getSupervisors,updateSupervisor,deleteSupervisor} = require('../controllers/supervisorMasterController');
const router = express.Router();

const path = require('path');
const app = express();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

router.get('/', getSupervisors);

// // Route to update a supervisor
router.put('/:id', updateSupervisor);

router.delete('/:id', deleteSupervisor);

module.exports = router;