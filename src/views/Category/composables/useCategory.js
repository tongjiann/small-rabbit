import {onMounted, ref} from "vue";
import {getTopCategoryAPI} from '@/apis/category';
import {onBeforeRouteUpdate, useRoute} from "vue-router";

export function useCategory() {
    const categoryData = ref({})
    const route = useRoute()

    const getCategory = async (id = route.params.id) => {
        // 如何在setup中获取路由参数 useRoute() -> route 等价于this.$route
        const res = await getTopCategoryAPI(id)
        categoryData.value = res.result
    }
    onMounted(() => getCategory())
    onBeforeRouteUpdate((to) => getCategory(to.params.id))

    return {
        categoryData
    }
}
