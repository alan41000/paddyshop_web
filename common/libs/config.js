var fileHost = "https://image-test-long.oss-cn-guangzhou.aliyuncs.com" // oss基础地址，自己设置  如：'https：//baidu.com'
var config = {
    //aliyun OSS config
    uploadImageUrl: `${fileHost}`, // 默认存在根目录，可根据需求改
    AccessKeySecret: 'dty0H3v5dEkH410xeH9wlDCMeCi5Xu', // OSS中accessKeySecret
    OSSAccessKeyId: 'LTAI5t83xZ1SX4qSHu7uLVhu',   // OSS中accessKeyId
    timeout: 87600 //这个是上传文件时Policy的失效时间
};
module.exports = config