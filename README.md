# Code Containers

## Overview
Code Containers is a project designed to help developers create development environments efficiently.

## Features
- Easy setup and configuration

## Getting Started
To get started with Code Containers, follow these steps:

1. Clone the repository and enter its directory:
  ```bash
  git clone https://github.com/CyberL1/code-containers.git
  cd code-containers
  ```

2. Copy .env.example to .env:
  ```bash
  cp .env.example .env
  ```

3. Build example image:
  ```bash
  docker build -t code-containers/example images/example
  ```

4. Run it:
  ```bash
  cd compose
  docker compose up
  ```

## Documentation
For detailed documentation, please refer to the [Wiki](https://github.com/CyberL1/code-containers/wiki).

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
