<template>
    <div>
        <header-component :user="user"/>
        <main>
            <nav>
                <menu-component />
            </nav>
            <section>

            </section>
        </main>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import store from "@/store/index"
import HeaderComponent from '@/components/header/HeaderComponent.vue'
import MenuComponent from '@/components/menu/MenuComponent.vue'

export default defineComponent({
    components: {
        HeaderComponent,
        MenuComponent
    },
    setup() {
        return {
            user: computed(() => store.state.user)
        }
    }
})
</script>

