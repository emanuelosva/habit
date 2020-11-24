FROM node:12

# COPY dependencies files.
COPY ["package.json", "yarn.lock", "/usr/src/"]

# MOVE to workdir
WORKDIR /usr/src

# INSTALL `yarn`
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt update && apt install yarn -y

# INSTALL dependencies
RUN yarn install

# COPY app files
COPY [".", "/usr/src"]

# PORT
EXPOSE 8080
