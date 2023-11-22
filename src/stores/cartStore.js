import {defineStore} from "pinia";
import {ref} from "vue";


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

        return {
            cartList,
            addCart: addCart
        }
    },
    {
        persist: true
    })
