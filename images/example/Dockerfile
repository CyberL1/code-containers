FROM debian
ENV USER=example

RUN apt update && \
  apt install sudo curl -y

RUN adduser $USER --disabled-password --gecos "" && \
  echo "$USER:$USER" | chpasswd && \
  echo "$USER ALL=(ALL) PASSWD: ALL" > /etc/sudoers.d/$USER

RUN mkdir /opt/code-server && \
  curl -Lo /tmp/code-server.tar.gz $(curl -s https://api.github.com/repos/coder/code-server/releases/latest | grep browser_download_url | grep arm64.tar.gz | cut -d '"' -f 4) && \
  tar xvf /tmp/code-server.tar.gz --strip-components 1 -C /opt/code-server && \
  mkdir /workspace && \
  chown $USER:$USER /workspace

USER $USER
WORKDIR /home/$USER

RUN mkdir -p .config/code-server && \
  <<EOF cat > .config/code-server/config.yaml
bind-addr: 0.0.0.0
auth: none
EOF

WORKDIR /workspace
COPY . .

ENTRYPOINT ["/opt/code-server/bin/code-server", "."]
