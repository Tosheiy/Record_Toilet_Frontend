# 1. ベースイメージとしてNode.jsを指定
FROM node:16-alpine

# 2. アプリケーションディレクトリを作成
WORKDIR /app

# 3. package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 4. 依存関係をインストール
RUN npm install

# 5. アプリケーションコードをコピー
COPY . .

# 6. ビルド
RUN npm run build

# 7. サーバーを開始
CMD ["npm", "start"]