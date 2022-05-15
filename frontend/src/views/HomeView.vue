<template>
    <div>
        <h1>Página Home</h1>

        <p>{{ user }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import store from "@/store/index"

export default defineComponent({
    setup() {
            return {
            user: computed(() => store.state.user)
        }
    }
})
</script>

