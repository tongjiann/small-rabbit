import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {useUserStore} from "@/stores/userStore";
import {delCartAPI, findNewCartListAPI, insertCartAPI} from "@/apis/cart";


export const useCartStore = defineStore('cart', () => {
        const userStore = useUserStore()
        const isLogin = computed(() => userStore.userInfo.token)
        const cartList = ref([])
        const addCart = async (good) => {
            if (isLogin.value) {
                const {skuId, count} = good
                await insertCartAPI({skuId, count})
                await updateNewList()
            } else {
                const item = cartList.value.find((item) => good.skuId === item.skuId)
                if (item) {
                    item.count += good.count
                } else {
                    cartList.value.push(good)
                }
            }
        }
        const delCart = async (skuId) => {
            if (isLogin.value) {
                await delCartAPI([skuId])
                await updateNewList()
            } else {
                const idx = cartList.value.findIndex((item) => skuId === item.skuId)
                cartList.value.splice(idx, 1)
            }
        }

        const updateNewList = async () => {
            const res = await findNewCartListAPI()
            cartList.value = res.result
        }

        const totalCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))

        const selectedCount = computed(() => cartList.value
            .filter((item) => item.selected)
            .reduce((a, c) => a + c.count, 0))

        const totalPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))
        const selectedPrice = computed(() => cartList.value
            .filter((item) => item.selected)
            .reduce((a, c) => a + c.price * c.count, 0))


        const singleCheck = (skuId, selected) => {
            // 通过skuId找到要修改的那一项 然后把它的selected修改为传过来的selected
            const item = cartList.value.find((item) => item.skuId === skuId)
            item.selected = selected
        }

        const isAll = computed(() => cartList.value.every((item) => item.selected))

        const changeAll = () => {
            if (isAll.value) {
                cartList.value.forEach((item) => item.selected = false)
            } else {
                cartList.value.forEach((item) => item.selected = true)
            }
        }
        return {
            addCart,
            delCart,
            singleCheck,
            changeAll,
            cartList,
            totalCount,
            selectedCount,
            totalPrice,
            selectedPrice,
            isAll
        }
    },
    {
        persist: true
    })
