<template>
    <nav>
        <figure>
            <img :src="img" alt="Logo" />
        </figure>
    </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
    setup() {
        const img = computed(() => require("@/assets/imgs/logo.png"))

        return {
            img
        }
    },
})
</script>
