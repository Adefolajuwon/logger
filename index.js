const opts = {
	enable: true,
	cloudflare: true,
	trustProxy: true,
	ignoreIPs: ['192.168.0.1', '10.0.0.1'],
	ignoreURLs: ['/health', '/status'],
	headers: true,
	body: false,
	userAgent: true,
};
