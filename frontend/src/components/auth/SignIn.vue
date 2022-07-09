<template>
  <div class="box">
    <figure>
      <img :src="img" alt="Logo" />
    </figure>

    <form class="form-box" @submit.prevent.enter="signIn">
      <div>
        <!-- Input de email -->
        <div class="form-row">
          <gtg-input 
            :inputLabel="`E-mail`" 
            :inputType="`email`" 
            :inputName="`email`"
            :autoComplete="`username`"
            @value="handleEmail"/>
        </div>

        <!-- Input de senha -->
        <div class="form-row">
          <gtg-input 
            :inputLabel="`Senha`" 
            :inputType="`password`" 
            :inputName="`password`"
            :autoComplete="`current-password`"
            @value="handlePassword"/>
        </div>
      </div>

      <!-- Botão de Login -->
      <div>
        <button type="submit" @click.prevent="signIn">
        <span>Entrar</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Login } from "@/types/index"
import { useToast } from "vue-toastification"
import AuthenticationService from "@/services/AuthenticationService"
import store from "@/store/index"
import VueJwtDecode from 'vue-jwt-decode';
import GtgInput from '../shared/GTG-Input.vue'

export default defineComponent({
  components: {
    GtgInput
  },
  setup() {
    const login: Ref<Login> = ref({ email: '', password: '' })
    const toast  = useToast()
    const router = useRouter()
    const img = computed(() => require("@/assets/imgs/logo.png"))

    function handleEmail (email: string) {
      login.value.email = email
    }

    function handlePassword (password: string) {
      login.value.password = password
    }

    function hasLogin (login: Login) : boolean {
      if (login.email == "" || login.password == '')
        return false
      
      return true
    }

    function signIn () {
      if (!hasLogin(login.value)) {
        toast.error(`Ocorreu um erro: Parâmetros incorretos`)
        return
      }
        
      AuthenticationService.login(login.value)
        .then((response) => {
          if (response.err_status) {
            toast.error(`Ocorreu um erro: ${ response.message }`)
            return
          }
            
          localStorage.setItem("__chave_usuario", response.token)
          const user = VueJwtDecode.decode(response.token)
          store.setUser({
            name: user.name,
            username: user.username,
            avatar: user.avatar,
            email: user.email
          })
          toast.success("Usuário logado")
          router.push({ name: 'home' })
        })
    }

    return {
      login,
      img,
      signIn,
      handleEmail,
      handlePassword
    }    
  },
})
</script>

