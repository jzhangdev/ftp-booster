FROM langchain/langgraphjs-api:20

ADD . /deps/ftp-booster

ENV LANGSERVE_GRAPHS='{"FTPBooster":"./graph/ftp-booster-graph.ts:graph"}'

WORKDIR /deps/ftp-booster

RUN pnpm i --frozen-lockfile

RUN (test ! -f /api/langgraph_api/js/build.mts && echo "Prebuild script not found, skipping") || tsx /api/langgraph_api/js/build.mts