import Crypto from './crypto.js';
import Config from './config.js'
import './hmac.js';
import './sha1.js';
import { Base64 } from './base64.js';

const uploadFileSize = 1024 * 1024 * 5; // 上传文件的大小限制5m

export default {
	_getPolicy() {
		const date = new Date();
		date.setHours(date.getHours() + 1);
		let policyText = {
			"expiration": date.toISOString(), //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
			"conditions": [
				["content-length-range", 0, uploadFileSize] // 设置上传文件的大小限制
			]
			
		};

		return Base64.encode(JSON.stringify(policyText))
	},

	_getSignature(accessKeySecret, canonicalString) {
		let bytes = Crypto.HMAC(Crypto.SHA1, canonicalString, accessKeySecret, {
			asBytes: true
		});
		return Crypto.util.bytesToBase64(bytes);
	},
	_getSuffix(filename) {
		let pos = filename.lastIndexOf('.')
		let suffix = ''
		if (pos != -1) {
			suffix = filename.substring(pos)
		}
		return suffix;
	},
	/* 
	    根据当前时间戳在oss中自动生成对应时间的图片地址  
		
		如：goods/images/2021-02-25/图片地址 
	 */
	getFileName(name,filename) {
		let nowTime = function getNowFormatDate() {
			var date = new Date();
			var seperator1 = "-";
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var strDate = date.getDate();
			if (month >= 1 && month <= 9) {
				month = "0" + month;
			}
			if (strDate >= 0 && strDate <= 9) {
				strDate = "0" + strDate;
			}
			var currentdate = year + seperator1 + month + seperator1 + strDate;
			return currentdate;
		}()
		return name + '/' + nowTime + '/' + new Date().getTime() + Math.random().toString(36).substring(3, 20) + this._getSuffix(filename)
	},

	/* 选择获取本地图片 */
	getImage() {
		return new Promise((resolve, reject) => {
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'],
				success: (res) => {
					resolve(res)
				}
			})
		});
	},
	// 获取STS签名
	get_STS() {
		// 通过后台接口读取签名信息
		/* return new Promise((resolve, reject) => {
		    let name = new Date().getTime() + Math.random();
		    let operate = 'uploadImg';
		    let that = this;
		    uni.request({
		        method: "GET",
		        url: "*************", // 接口请求地址
		        data: {
		            name,
		            operate,
		            sign: Crypto.MD5(name + operate + "bayinabayin888").toString()
		        },
		        success(res) {
		            if (res.data.code != 200) {
		                that.$alert(res.data.message || res.data.msg)
		            } else {
		                resolve(res.data.data)
		            }
		        },
		        error(err) {
		            reject(err)
		        }
		    })
		}) */
		// 通过本地自己设置签名信息
		return new Promise((resolve, reject) => {
			let policy = this._getPolicy();
			let res = {
				accessId: Config.OSSAccessKeyId,
				host: Config.uploadImageUrl,
				policy,
				signature: this._getSignature(policy),
			};
			resolve(res)
		})
	},
};
