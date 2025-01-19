FROM openresty/openresty:alpine

RUN wget -O /usr/local/openresty/lualib/resty/http.lua https://github.com/ledgetech/lua-resty-http/raw/refs/heads/master/lib/resty/http.lua
RUN wget -O /usr/local/openresty/lualib/resty/http_connect.lua https://github.com/ledgetech/lua-resty-http/raw/refs/heads/master/lib/resty/http_connect.lua
RUN wget -O /usr/local/openresty/lualib/resty/http_headers.lua https://github.com/ledgetech/lua-resty-http/raw/refs/heads/master/lib/resty/http_headers.lua

ENTRYPOINT ["/bin/sh", "-c", "sed \"s/{PROXY_DOMAIN}/$PROXY_DOMAIN/\" etc/nginx/templates/proxy.conf > etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
