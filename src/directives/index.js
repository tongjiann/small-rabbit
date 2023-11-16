import {useIntersectionObserver} from "@vueuse/core/index";

export const lazyPlugin = {
    install(app) {
        app.directive('img-lazy', {
            mounted(el, binding) {
                console.log(el, binding.value)
                const {stop} = useIntersectionObserver(
                    el, ([{isIntersecting}]) => {
                        if (isIntersecting) {
                            el.src = binding.value
                            stop()
                        }
                    }
                )
            }
        })
    }
}
