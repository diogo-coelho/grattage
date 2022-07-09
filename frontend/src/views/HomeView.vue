<template>
    <div>
        <header-component />
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import store from "@/store/index"
import HeaderComponent from '@/components/header/HeaderComponent.vue'

export default defineComponent({
    components: {
        HeaderComponent
    },
    setup() {
        return {
            user: computed(() => store.state.user)
        }
    }
})
</script>

