const router = express.Router()

router.get('/', function(req, res, next) {
  
  let userStatus = {
    authenticated: false 
  }

  res.render('index', { 
            title: 'beads', 
            userStatus
  })

})

router.get('/login', (req, res)=>res.send('y'))



