<template>
  <div id="takefile">
		<a href="qujian.html">
			<div class="take">
				<span class="fas fa-map-marker qu"></span>
				<p class="choiceAddr">请选择取件地址</p>
				<div class="giveBox">
					<img src="~assets/img/home/addr.jpg">
				</div>
			</div>
		</a>
		
		<div class="give" @click="chooseAddr">
			<div v-if="!temp">
				<span class="fas fa-map-marker song"></span>
				<p class="choiceAddr">请选择送至地址</p>
				<div class="giveBox">
					<img src="~assets/img/home/addr.jpg">
				</div> 
			</div>
			<div v-if="temp" class="give-addr-detail">
				<span class="give-addrInfo">{{temp.address}}</span>
				<span class="give-addremark">{{temp.name + ' ' + temp.tel}}</span>
			</div>
		</div>
		<div class="remarks">
			<p class="expTit">备注信息:</p>
			<input class="remarkInput" type="text" placeholder="时间、无接触配送、代付、指定快递员等" />
		</div>
		<div class="specs">
			<p class="expTit">*规格选项:</p>
		</div>
		
		<div class="special">
			<p class="expTit">特殊服务:</p>
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
		<!-- <div class="serverFoot">
			<div class="footL"></div>
			<div class="footR">
				<p>T:121XXXXXX</p>
				<p>V:zhkkdjh</p>
			</div>
		</div> -->
		<AddrPop ref="addrPop" @addrReturn="addrReturn" :addrData="addrData"></AddrPop>
  </div>
	
</template>

<script>
	import AddrPop from "components/content/addrpop/AddrPop"
  export default {
		name: "TakeFile",
		props: {
			addrData: Array
		},
		components: {
			AddrPop
		},
		data() {
			return{
				fileList: [
					{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
					// Uploader 根据文件后缀来判断是否为图片文件
					// 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
				],
        temp: undefined,
			}
		},
		methods: {
			handleSubmit() {
				this.$router.push('/orderdetails')
			},
			chooseAddr() {
        this.$refs.addrPop.addrChoose();
			},
      addrReturn(item) {
        // console.log(item)
        // 获取地址
        this.temp = Object.assign({}, item)
      }
		}
  }
</script>
	
<style scoped>
	@import './css/all.css';
	@import './css/main.css';
	#takefile {
		width: 90%;
		margin: 0 auto;
	}
</style>