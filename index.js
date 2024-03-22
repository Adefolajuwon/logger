const pen = require('tiny-pen');
const compressUA = require('compress-user-agent');

const DATE_FORMAT = {
	year: '2-digit',
	month: 'numeric',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric',
	second: 'numeric',
};

function requestLogger(options = {}) {
	return async function (req, res, next) {
		const start = process.hrtime();

		if (options.activate === false) {
			next();
			return;
		}

		let ipAddress = req.connection.remoteAddress;
		const country =
			options.cloudflare && req.headers['cf-country']
				? req.headers['cf-country']
				: '';

		if (options.trustProxy && req.headers['x-forwarded-for']) {
			ipAddress = req.headers['x-forwarded-for'].split(',')[0];
		}

		ipAddress = cleanIP(ipAddress);

		if (options.excludeIPs && options.excludeIPs.includes(ipAddress)) {
			next();
			return;
		}

		if (
			options.excludeURLs &&
			options.excludeURLs.some((url) => req.url.startsWith(url))
		) {
			next();
			return;
		}

		res.on('finish', () => {
			const elapsed = process.hrtime(start);
			const responseTime = elapsed[0] * 1000 + elapsed[1] / 1000000;

			const openBracket = pen.gray(pen.bold('['));
			const closeBracket = pen.gray(pen.bold(']'));

			const log = [
				'- Request',
				openBracket +
					pen.white(
						new Date().toLocaleString(options.locale || 'en-GB', DATE_FORMAT)
					) +
					closeBracket,
				openBracket +
					pen.yellow(ipAddress) +
					(country ? ' ' + pen.gray(country) : '') +
					closeBracket,
				openBracket + pen.cyan(req.method) + closeBracket,
				pen.green(req.url) + closeBracket,
				'Response Status Code:',
				res.statusCode,
				'Response Time:',
				responseTime.toFixed(2) + 'ms',
			];

			if (options.includeHeaders) {
				log.push(req.headers);
			}

			if (options.includeBody) {
				log.push(req.body);
			}

			if (options.userAgent !== false) {
				log.push(pen.gray(compressUA(req.headers['user-agent'])));
			}

			console.log(...log);
		});

		next();
	};
}

function cleanIP(addr) {
	if (addr.startsWith('::ffff:')) {
		return addr.slice(7);
	}
	return addr;
}
