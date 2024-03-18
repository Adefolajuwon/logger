function RequestLogger(opts = {}) {
	return async function (req, res, next) {
		if (opts.enable == false) {
			next();
			return;
		}
		const country =
			opts.cloudflare && req.headers['cf-ipcountry']
				? req.headers['cf-ipcountry']
				: '';

		if (opts.trustProxy)
			remoteAddress = (req.headers['x-forwarded-for'] || '').split(',').shift();
		else remoteAddress = req.connection.remoteAddress;

		remoteAddress = trim(remoteAddress);

		if (
			opts.ignoreURLS &&
			opts.ignoreURLS.find((url) => req.url.startsWith(url))
		) {
			next();
			return;
		}
	};
}

function trim(addr) {
	if (addr.startsWith('::ffff:')) addr = addr.slice(7);
	return addr;
}
