<template>
	<div class="gra">
		<div class="img" id="img-box">
			<img :src="img + item.previewImage" alt="">
			<!-- <img class="img-left" src="http://wawa-1255600302.file.myqcloud.com/images/new.png" alt=""> -->
			<!-- <img class="img-right" src="http://wawa-1255600302.file.myqcloud.com/images/new.png" alt=""> -->
		</div>
		<div class="text">
			
			<p class="name">
				<img class="vip" v-if="item.vip" src="http://wawa-1255600302.file.myqcloud.com/images/vip.png" alt="">
				<span :class="{'ml': item.vip}">{{item.name}}</span>
			</p>
		</div>
		<div class="price" :class="{play: item.onPlaying}">
			<span>{{item.onPlaying ? '热抓中' : '空闲中'}}</span>
		</div>
		<div class="gold">
			<span>{{item.coinPrice}}币</span>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['item'],
	}
</script>

<style lang="less">
@import './../../assets/css/public.less';
	.pic {
		display: flex;
		flex-flow: row wrap;
	}
	.graphic:first-child, .graphic:nth-child(2) {
		margin-top: 2%;
	}
	.graphic {
		background: #fff;
		box-sizing: border-box;
		border-radius: 4px;
		overflow: hidden;
		width: 47%;
		margin: 0 2% 2% 2%;
		position: relative;
		&:nth-child(even) {
			margin-left: 0;
		}
		.img {
			position: relative;
			overflow: hidden;
			line-height: 0;
			img {
				width: 100%;
			}
			.img-left {
				position: absolute;
				top: 2.8rem;
				left: 2.8rem;
				width: 30%;
			}
			.img-right {
				position: absolute;
				bottom: 0;
				right: 0;
				width: 40%;
			}
		}
		.text {
			padding: 5px;
			position: relative;
			
			.name {
				line-height: 1.5;
				font-size: 1.6rem;
				.lineClamp;
				position: relative;
				.vip {
					width: 3rem;
					position: absolute;
					top: 3px;
				}
				.ml {
					margin-left: 3.5rem;
				}
			}
			.coins {
				display: inline-flex;
				align-items: center;
				color: #b0b0b0;
				font-size: 1.5rem;
			}
			.status {
				position: absolute;
				top: 50%;
				left: 5px;
				transform: translate(0,-50%);
				width: 10px;
				height: 10px;
				border-radius: 50%;
			}
			.start {
				background: #f76260;
				border: 3px solid rgb(255, 210, 210);
			}
			.end {
				background: #5eae00;
				border: 3px solid rgb(227, 249, 197);
			}
			.number {
				position: absolute;
				font-size: 10px;
				border: 1px solid #f76260;
				padding: 0px 3px;
				color: #f76260;
				border-radius: 3px;
				margin-right: 3px;
				top: 7px;
			}
		}
		.gold {
			position: absolute;
			top: -10px;
			left: -33px;
			font-size: 1.5rem;
			color: #fff;
			background: #f26687;
			// padding: 4px 4px 4px 7px;
			height: 5rem;
			line-height: 7.5rem;
			width: 10rem;
			z-index: 1;
			transform: rotate(-45deg);
			text-align: center;
			// border-bottom-right-radius: 30px;
    	// border-top-right-radius: 30px;
		}
		.price {
			position: absolute;
			top: 5px;
			right: 0px;
			font-size: 1.3rem;
			line-height: 1.5rem;
			color: #fff;
			background: #69ab00;
			padding: 4px 4px 4px 7px;
			height: 1.5rem;
			z-index: 1;
			border-bottom-left-radius: 30px;
    	border-top-left-radius: 30px;
		}
		.play {
			background: #f26687;
		}
		.full {
			background-color: #000;
			&:before {
				border-right: 10px solid #000;
			}
		}
	}
</style>