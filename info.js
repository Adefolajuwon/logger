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
2024-03-20T14:30:00 - HTTP request forwarded to server: 
    Method: GET
    URL: http://example.com/api/data
    Protocol: HTTP/1.1
    Host: example.com
    Port: 80
    Path: /api/data
    Query Parameters: 
        - param1: value1
        - param2: value2
    Headers: 
        - Host: example.com
        - User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36
        - Accept: application/json
        - Accept-Encoding: gzip, deflate
        - Connection: keep-alive
    Body: [optional]
        {
            "key": "value"
        }
