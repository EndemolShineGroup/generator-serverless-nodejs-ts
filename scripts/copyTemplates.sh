#!/usr/bin/env bash

for file in "function" "project"; do
  cp -R "src/${file}/templates" "generators/${file}";
done;
unset file;
