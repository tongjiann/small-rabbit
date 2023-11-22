import {defineStore} from "pinia";
import {ref} from "vue";
import {loginAPI} from "../apis/user";
import {useCartStore} from "@/stores/cartStore";

export const useUserStore = defineStore("user", () => {
    const userInfo = ref({})
    const getUserInfo = async (account, password) => {
        const res = await loginAPI({account, password})
        userInfo.value = res.result
        await cartStore.mergeCart()
        await cartStore.updateNewList()
    }

    const cartStore = useCartStore()

    const clearUserInfo = () => {
        userInfo.value = {}
        cartStore.clearCart()
    }

    return {
        userInfo,
        getUserInfo,
        clearUserInfo
    }
}, {
    persist: true
})
