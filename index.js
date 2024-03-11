class RequestLogger {
	constructor(opts = {}) {
		this.opts = opts;
	}
	async logRequest(req, res, next) {
		if (this.opts.enable == false) {
			next();
			return;
		}
	}
}
//
