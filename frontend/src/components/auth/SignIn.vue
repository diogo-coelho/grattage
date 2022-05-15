<template>
  <div class="box">
    <h1>Grattage</h1>

    <form class="form-box" @submit.prevent.enter="signIn">
      <div>
        <!-- Input de email -->
        <div class="form-row">
          <label>E-mail: </label>
          <div class="input-form">
          <input type="email" name="email" v-model="login.email" autocomplete="username"/>
          </div>
        </div>

        <!-- Input de senha -->
        <div class="form-row">
          <label>Senha: </label>
          <div class="input-form">
          <input type="password" name="password" v-model="login.password" autocomplete="current-password"/>
          </div>
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
import { defineComponent, Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Login } from "@/types/index"
import { useToast } from "vue-toastification"
import AuthenticationService from "@/services/AuthenticationService"

export default defineComponent({
  setup() {
    const login: Ref<Login> = ref({ email: '', password: '' })
    const toast  = useToast()
    const router = useRouter()

    function hasLogin (login: Login) : boolean {
      if (login.email == "" || login.password == '')
        return false
      
      return true
    }

    function signIn () {
      if (hasLogin(login.value)) {
        AuthenticationService.login(login.value)
          .then((response) => {
            if (!response.err_status) {
              localStorage.setItem("__chave_usuario", response.token)
              toast.success("Usuário logado")

              router.push({ name: 'home' })
            } else {
              toast.error(`Ocorreu um erro: ${ response.message }`)
            }
          })
      } else {
        toast.error("Ocorreu um erro: campos não podem estar vazios")
      }
    }

    return {
      login,
      signIn
    }    
  },
})
</script>

<style lang="scss" scoped>

</style>

