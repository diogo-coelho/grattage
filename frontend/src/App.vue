<template>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from "vue-toastification"
import store from "./store/index"
import VueJwtDecode from 'vue-jwt-decode'

export default defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()
    const toast  = useToast()

    function validateSession () : void {
      const userKey = localStorage.getItem("__chave_usuario")
      
      if (!userKey) {

        if (route.name === 'auth') return
        router.push({ name: 'auth' })

      } else {
        
        const user = VueJwtDecode.decode(userKey)
        if (!user) {
          
          localStorage.removeItem("__chave_usuario");
          router.push({ name: 'auth' })
          toast.error("Sessão inválida")
          
        }

        if (user.iat < Math.floor(Date.now() / 1000)) {
          
          localStorage.removeItem("__chave_usuario");
          router.push({ name: 'auth' })
          toast.error("Sessão expirada")

        } else {
          
          store.setUser({
            name: user.name,
            username: user.username,
            avatar: user.avatar,
            email: user.email
          })
          router.push({ name: route.name || 'home' })

        }
      }
    }

    onMounted(() => {
      validateSession()
    })
  },
})
</script>

<style lang="scss">
@import './assets/scss/app.scss';
</style>
