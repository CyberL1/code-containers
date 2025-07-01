FROM alpine AS setup

WORKDIR /code-server

RUN apk add curl && \
  curl -Lo /tmp/code-server.tar.gz $(curl -s https://api.github.com/repos/coder/code-server/releases/latest | grep browser_download_url | grep 'linux-arm64.tar.gz' | cut -d '"' -f 4) && \
  tar xvz --strip-components=1 -f /tmp/code-server.tar.gz && \
  printf "bind-addr: 0.0.0.0\nauth: none\n" > config.yaml

FROM debian
ENV USER=example

COPY --from=setup /code-server /opt/code-server

RUN apt update && \
  apt install sudo -y && \
  adduser $USER --disabled-password --gecos "" && \
  echo "$USER:$USER" | chpasswd && \
  echo "$USER ALL=(ALL) PASSWD: ALL" > /etc/sudoers.d/$USER

USER $USER
WORKDIR /workspace

COPY --chown=$USER workspace .
ENTRYPOINT ["/opt/code-server/bin/code-server", ".", "--config", "/opt/code-server/config.yaml"]
