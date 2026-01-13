#!/bin/bash

# 결과를 저장할 경로 (Vite의 경우 public 폴더에 두는 것이 관리하기 편합니다)
OUTPUT_FILE="./public/env-config.js"

echo "window._ENV = {" > $OUTPUT_FILE
# VITE_로 시작하는 환경 변수들을 순회
for key in $(env | grep -E "^VITE_" | cut -d= -f1); do
  # 변수의 값을 가져옴
  value=$(eval echo \$$key)
  echo "  $key: \"$value\"," >> $OUTPUT_FILE
done
echo "}" >> $OUTPUT_FILE