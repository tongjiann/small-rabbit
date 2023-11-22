import {defineStore} from "pinia";
import {computed, ref} from "vue";


export const useCartStore = defineStore('cart', () => {
        const cartList = ref([])
        const addCart = (good) => {
            const item = cartList.value.find((item) => good.skuId === item.skuId)
            if (item) {
                item.count += good.count
            } else {
                cartList.value.push(good)
            }
        }
        const delCart = (skuId) => {
            const idx = cartList.value.findIndex((item) => skuId === item.skuId)
            cartList.value.splice(idx, 1)
        }

        const totalCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))

        const totalPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))
        return {
            cartList,
            addCart,
            delCart,
            totalCount,
            totalPrice
        }
    },
    {
        persist: true
    })
