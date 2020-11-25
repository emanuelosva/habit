FROM node:12

# COPY dependencies files.
COPY ["package.json", "yarn.lock", "/usr/src/"]

# MOVE to workdir
WORKDIR /usr/src

# INSTALL `yarn`
RUN apt-get update && apt-get install -y curl apt-transport-https && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn

# INSTALL dependencies
RUN yarn install
RUN npm install -g nodemon

# COPY app files
COPY [".", "/usr/src"]

# PORT
EXPOSE 8080
