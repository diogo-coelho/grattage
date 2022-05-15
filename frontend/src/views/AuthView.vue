<template>
    <div class="container-auth">
      <sign-in />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SignIn from "@/components/auth/SignIn.vue"

export default defineComponent({
    components: {
      SignIn
    }
})
</script>
