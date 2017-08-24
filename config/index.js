module.exports = {
	secret: process.env.NODE_ENV === 'PRODUCTION' ? process.env.SECRET : 'SECRET'
};
