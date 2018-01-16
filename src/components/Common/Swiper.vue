<template>
	<div v-if="type">
		<div class="picture" v-if="imgList.length > 0">
			<swiper loop auto>
				<swiper-item class="swiper-item-img" v-for="(item, index) in imgList" :key="index" @click.native="goDetail(item.id)">
					<img :src="item.img">
					<div class="title">
						<p :style="{width: iconRight + 'px'}" style="font-size: 1.6rem;">{{item.title}}</p>
					</div>
				</swiper-item>
			</swiper>
		</div>
	</div>
	<div v-else>
		<div class="picture" v-if="imgList.length > 0">
			<!-- <swiper loop auto :list="imgList" dots-position="center" :aspect-ratio="260/750"></swiper> -->
			<swiper loop auto dots-position="center" :aspect-ratio="260/750">
				<swiper-item class="swiper-item-img" v-for="(item, index) in imgList" :key="index"  @click.native="goDetail(item.url)">
					<img :src="item.img">
					<!-- <div class="title">
						<p :style="{width: iconRight + 'px'}" style="font-size: 1.6rem;">{{item.title}}</p>
					</div> -->
				</swiper-item>
			</swiper>
		</div>
	</div>
		
</template>

<script>
	import { Swiper, SwiperItem } from 'vux'
	import api from '../../api/api'

	export default {
		components: {
			Swiper, SwiperItem
		},
		props: {
			moduleName: String,
			type: Boolean,
		},
		data () {
			return {
				iconRight: 0,
				imgList: [
					// { img: './static/images/gg.png' }, 
					// { img: './static/images/guanggao1.png' },
				],
			}
		},
		created () {
			this.getCarousel()
		},
		methods: {
			goDetail (url) {
				if (url) window.location.href = url
				// this.$router.push({name: this.moduleName + 'Detail', params: {id: id}})
			},
			getCarousel () {
				// let params = { categoryId: this.moduleName ? this.moduleName + 'Img' : this.moduleName }
				api.getImages(3).then(res => {
					if (res.data.errCode === 0) {
						console.log('getImages')
						console.log(res.data)
						let ImgData = res.data.list
						if (this.type) {
							this.imgList = ImgData.map(item => ({
								id: item.id,
								img: this.img + item.url,
								title: item.name
							}))
						} else {
							this.imgList = ImgData.map(item => ({
								id: item.id,
								img: this.img + item.url,
								url: item.href,
							}))
						}
						this.iconRight = window.innerWidth - this.imgList.length * 12 - 20
						console.log('this.imgList')
						console.log(this.imgList)
						// this.loading(false)
					} else {
						// this.loading(true)
					}	
				})
			},
		}
	}
</script>

<style lang="less">

	.swiper-item-img {
		position: relative;
		border-radius: 5px;
		img {
			width: 100%;
		}
		.title {
			position: absolute;
			bottom: 0;
			background: rgba(51, 51, 51, 0.58);
    	width: 100%;
    	padding: 10px 0 10px 10px;
    	color: #fff;
    	p {
    		overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
    	}
		}
	}
</style>