import aj from '../config/arcjet.js';

const arcjetMiddleware = async (req, res, next) => {
  try {
    const desision = await aj.decide(req);

    if (desision.isDenied) {
      if (desision.reason.isRateLimit())
        return res
          .status(429)
          .json({ error: 'Rate limit exceeded', message: 'Too many requests' });
      if (desision.reason.isBot())
        return res.status(403).json({
          error: 'Bot detected',
          message: 'Access forbidden for bots',
        });
      return res
        .status(403)
        .json({ error: 'Access denied', message: 'Request denied' });
    }
    next();
  } catch (error) {
    console.log('Arcjet error:', error);
    next(error);
  }
};

export default arcjetMiddleware;
