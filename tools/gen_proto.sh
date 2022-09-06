#! /bin/bash

SRC_DIR=./proto/
DEST_DIR=./src/__codegen__

if [ ! -d "$DEST_DIR" ]; then
  mkdir -p $DEST_DIR
fi

yarn dlx pbjs \
--ts $DEST_DIR/rpc.ts \
$SRC_DIR/*.proto
