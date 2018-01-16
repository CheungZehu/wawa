<template>
	<div class="add-address" :style="{height: height + 'px'}">
    <x-header title="添加地址"></x-header>
    <p class="youji">请填写邮寄地址</p>
    <div class="address-context">
      <group gutter="0" class="group">
        <!-- <x-input title="地址标题" placeholder="请输入标题" v-model="address.title" class="xinput"></x-input> -->
        <x-input title="收货人" placeholder="请输入姓名" v-model.trim="address.receiverAppellation" class="xinput"></x-input>
        <x-input title="联系电话" placeholder="请输入联系人电话"  v-model="address.mobile" class="xinput"></x-input>
        <x-address title="所在地区" :list="addressData" v-model="addressValue" @on-hide="getAddress" raw-value class="xaddress" placeholder="请选择地区"></x-address>
        <x-input title="详细地址" placeholder="请输入详细地址"  v-model.trim="address.street" class="xinput"></x-input>
      </group>
      <div class="a-btn">
        <x-button class="add-btn" @click.native="adds" v-if="this.$route.query.id">修改地址</x-button>
        <x-button class="add-btn" @click.native="adds" v-else>保存地址</x-button>
      </div>
    </div>
	</div>
</template>

<script>
	import api from '../../api/api'
	import { Group, Scroller, LoadMore, Divider, CheckIcon, XButton, Box, XInput, ChinaAddressV4Data, XAddress, Value2nameFilter as value2name, XHeader } from 'vux'
  import DollItemSelect from '../Common/DollItemSelect'
	import { mapState, mapActions } from 'vuex'
  // ChinaAddressV4Data

	export default {
		components: {
			Group, Scroller, LoadMore, Divider, DollItemSelect, CheckIcon, XButton, Box, XInput, ChinaAddressV4Data, XAddress, XHeader
		},
		data () {
			return {
				newsList: [],
				onData: false,
				onFetching: false,
				showUp: true,
				scrollerStatus: {
					pullupStatus: 'default'
				},
				search: {
					start: 0,
					limit: 10,
					count: 0
				},
				isPulldown: false,
				select: false,
				transportAmount: 0,
				leastRemitTransportAmountDollNum: 0,
        myDolls: [],
        isAddress: false,
        dollHeight: 0,
        address: {
          receiverAppellation: '',
          mobile: '',
          province: '',
          city: '',
          county: '',
          street: '',
        },
        addressData: ChinaAddressV4Data,
        addressValue: [],
        model: {},
        id: '',
        add: false,
        height: 0,
			}
		},
    created () {
      console.log(this.$route.query.id)
      if (this.$route.query.id) {
        this.addressesDetail()
      }
      if (this.$route.query.add) {
        this.add = true
      } else {
        this.add = false
      }
    },
		mounted() {
      this.height = window.innerHeight
      window.onresize = () => {
        this.height = window.innerHeight
      }
    },
		methods: {
      addressesDetail () {
        api.addressesDetail(this.$route.query.id).then(res => {
          if (res.data.errCode === 0) {
            let data = res.data.data
            this.address = {
              receiverAppellation: data.receiverAppellation,
              mobile: data.mobile,
              province: data.province,
              city: data.city,
              county: data.county,
              street: data.street,
            }
            console.log(this.address)
            this.addressValue = [data.province, data.city, data.county]
          }
        })
      },
      // 地址
      getAddress(data) {
        let a = this.getName(this.addressValue)
        console.log(typeof(a))
        let b = a.split(' ')
        console.log(b)
        this.address.province = b[0]
        this.address.city = b[1]
        this.address.county = b[2]
      },
      getName (value) {
        console.log(value)
        return value2name(value, ChinaAddressV4Data)
      },
      adds () {
        var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
        let state = true
        for (let key in this.address) {
          if (!this.address[key]) {
            this.showInfo('请填写全部信息')
            state = false
          } else if (key === 'mobile') {
            if (!reg.test(this.address[key])) {
              this.showInfo('请填写正确的手机号码')
              state = false
              return
            }
          } else {
            state = true
          }
        }
        if (state) {
          this.loading(true, '正在保存地址')
          console.log(this.address)
          if (this.$route.query.id) {
            this.updateAddresses()
          } else {
            this.addresses()
          }
        }
      },
      updateAddresses () {
        api.updateAddresses(this.$route.query.id, this.address).then(res => {
          console.log(res.data)
          if (res.data.errCode === 0) {
            this.loading(false)
            this.showInfo('地址修改成功')
            setTimeout(() => {
              this.$router.replace('/myInfo/address')
            }, 400)
          }
        })
      },
      addresses () {
        api.addresses(this.address).then(res => {
          console.log(res.data)
          if (res.data.errCode === 0) {
            this.loading(false)
            this.showInfo('地址添加成功')
            if (this.add) {
              setTimeout(() => {
                this.$router.replace('/myInfo/order')
              }, 400)
            } else {
              setTimeout(() => {
                this.$router.replace('/myInfo/address')
              }, 400)
            }
          } else {
            this.loading(false)
            this.showInfo(res.data.errMsg)
          }
        })
      },
		},
		watch: {
			newsList: {
				handler (val) {
					console.log(val)
					let count = 0
					val.map(item => {
						if (item.status) {
							count++
						}
					})
					if (count === val.length) {
						this.select = true
					} else {
						this.select = false
					}
					this.transport(count)
				},
				deep: true
			},
		}
	}
</script>

<style lang="less">
	.add-address {
    background: url(http://wawa-1255600302.file.myqcloud.com/images/bg2.png);
  	background-size: 100%;
    .youji {
      text-align: center;
      padding-bottom: 10px;
      font-size: 1.6rem;
      padding-top: 10px;
      color: #fff;
    }
    .address-context {
      background: #fff;
      margin: 0 1rem;
      padding: 1rem 1.5rem 7rem 1.5rem;
      border-radius: 5px;
      .group {
        .xinput {
          // border-bottom: 1px solid #fbe2e8;
          background: #fff;
          font-size: 1.5rem;
          input {
            text-align: right;
          }
        }
        .xaddress {
          // border-bottom: 1px solid #fbe2e8;
          background: #fff;
          font-size: 1.5rem;
        }
      }
      .a-btn {
        margin: 7rem 2rem 0 2rem;
        .add-btn {
          background: #af5064;
          color: #fff;
          font-size: 1.6rem;
          padding: 5px 0;
        }
      }
    }
  }
</style>

