
const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const accessToken = req.headers.authorization || 'N/A';

    if(!(accessToken && accessToken === "dhirajAssignemnt")){
      return res.status(401).json({ error: 'Unauthorized' });
    }

    console.log(`[${timestamp}] ${req.method}: ${req.url}, AccessToken: "${accessToken}"`);
    next();
  };
  
  module.exports = requestLogger;