# RecordToilet フロントエンド

AWS URL -> https://d2nehq3rb6dh1o.cloudfront.net



### npm run build
buildファイルを作成する

### aws s3 rm s3://toiletrecordfront --recursive
S3内のファイルを削除

### aws s3 sync build/ s3://toiletrecordfront
S3にbuildファイルをアップロード

