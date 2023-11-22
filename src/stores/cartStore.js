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
