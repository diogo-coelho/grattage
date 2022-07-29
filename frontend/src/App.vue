<template>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from "vue-toastification"
import VueJwtDecode from 'vue-jwt-decode'
import store from "@/store/index"

export default defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()
    const toast  = useToast()

    /**
     * Função que valida a sessão do usuário
     */
    function validateSession () : void {
      /** Token do usuário armazenado em localStorage */
      const userKey = localStorage.getItem("__chave_usuario")
      
      if (!userKey) {

        if (route.name === 'auth') return
        router.push({ name: 'auth' })

      } else {
        /** Informações do usuário decodificadas do token armazenado em localStorage */
        const user = VueJwtDecode.decode(userKey)
        if (!user) {
          
          localStorage.removeItem("__chave_usuario");
          router.push({ name: 'auth' })
          toast.error("Sessão inválida")
          
        }

        // Verifico se a sessão já está expirada e redireciono para a tela de Login
        if (user.iat < Math.floor(Date.now() / 1000)) {
          
          localStorage.removeItem("__chave_usuario");
          router.push({ name: 'auth' })
          toast.error("Sessão expirada")
        /* Caso contrário, as informações de usuário são armazenadas na store e o 
          usuário é redirecionado para a view Home */
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
