<template>
  <div id="senddelivery">
		<a href="qujian.html">
		<div class="take">
			<span class="fas fa-map-marker qu"></span>
			<p class="choiceAddr">请选择取件地址</p>
			<div class="giveBox">
				<img src="~assets/img/home/addr.jpg">
			</div>
		</div>
		</a>
		<a href="myaddr.html">
			<div class="give">
				<span class="fas fa-map-marker song"></span>
				<p class="choiceAddr">填写收件信息</p>
				<div class="giveBox">
					<img src="~assets/img/home/addr.jpg">
				</div>
			</div>
		</a>
		<div class="take">
			<span class="fas fa-map-marker qu"></span>
			<p class="choiceAddr">快递要求</p>
			<div class="selectBox">
				<span class="fas fa-sort-down down"></span>
				<select name="addr" class="sAddr">
					<option value="yt">圆通</option>
					<option value="zt">中通</option>
					<option value="yd">韵达</option>
					<option value="bs">百世</option>
				</select>
			</div>
		</div>
		<div class="screenshotInfo">
			<p class="expTit"> 截图信息:</p>
			<van-uploader v-model="fileList" multiple preview-size="50"/>
			<!-- <p class="voucher">取货信息截图</p> -->
		</div>
		<div class="remarks">
			<p class="expTit">备注信息（选填）:</p>
			<input class="remarkInput" type="text" placeholder="时间、无接触配送、代付、指定快递员等" />
		</div>
		<div class="specs">
			<p class="expTit">*规格选项:</p>
		</div>
		
		<div class="sub">
			<span class="dan">单量：</span>
			<input type="text" class="num" value="1"/>
			<div class="count">
				<span class="zj">总计：</span>
				<span class="money">￥0</span>
			</div>
			<button class="btn" @click="handleSubmit">提交订单</button>
		</div>
  </div>
</template>

<script>
import { Uploader } from 'vant'

export default {
	name: "SendDelivery",
	components: {
		[Uploader.name] : Uploader
	},
	data () {
		return {
			fileList: [
				{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
				// Uploader 根据文件后缀来判断是否为图片文件
				// 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
			],
		}
	},
	methods: {
		handleSubmit() {
			this.$router.push('/orderdetails')
		}
	}
}
</script>

<style scoped>
  @import './css/all.css';
	@import './css/main.css';
  #senddelivery {
    width: 90%;
    margin:0 auto;
  }
</style>