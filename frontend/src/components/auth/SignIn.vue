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
            :inputError="inputError"
            @value="handleEmail"/>
        </div>

        <!-- Input de senha -->
        <div class="form-row">
          <gtg-input 
            :inputLabel="`Senha`" 
            :inputType="`password`" 
            :inputName="`password`"
            :autoComplete="`current-password`"
            :inputError="inputError"
            @value="handlePassword"/>
        </div>
      </div>

      <!-- Botão de Login -->
      <div>
        <button type="submit" @click.prevent="signIn" :disabled="!login.email || !login.password">
        <span>Entrar</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, computed, ComputedRef } from 'vue'
import { useRouter } from 'vue-router'
import { Login, InputError, User } from "@/types/index"
import { useToast } from "vue-toastification"
import AuthenticationService from "@/services/AuthenticationService"
import store from "@/store/index"
import VueJwtDecode from 'vue-jwt-decode';
import GtgInput from '../shared/GTG-Input.vue'

interface SetupReturn {
  login: Ref<Login>
  img: ComputedRef<string>,
  signIn: () => void,
  handleEmail: (email: string) => void,
  handlePassword: (password: string) => void,
  inputError: Ref<InputError>
}

export default defineComponent({
  components: {
    GtgInput
  },
  setup() : SetupReturn {
    const login: Ref<Login> = ref({ email: '', password: '' })
    const inputError: Ref<InputError>  = ref({ inputType: undefined, messageError: undefined })
    const img: ComputedRef<string> = computed(() => require("@/assets/imgs/logo.png"))
    const timer = 750
    const toast: any  = useToast()
    const router: any = useRouter()
    
    /**
     * Função que recebe o valor emitido pelo input e carrega o 
     * atributo email dentro do objeto Login
     * @param {string} email valor de email recebido via emit
     */
    function handleEmail (email: string | undefined) : void {
      login.value.email = email
    }

    /**
     * Função que recebe o valor emitido pelo input e carrega o
     * atributo password dentro do objeto Login
     * @param {string} password - valor de senha recebido via emit
     */
    function handlePassword (password: string | undefined) : void {
      login.value.password = password
    }

    /**
     * Função que carrega as informações da variável Login e dispara 
     * o serviço AuthenticationService, acessando o método de login.
     * Caso a resposta seja positiva, o valor do token é armazenado 
     * em localStorage, e os dados decodificados são armazenados no
     * vuex, na variável user. Por fim, a aplicação redireciona o usuário para 
     * a rota '/home'
     */
    function signIn () : void {
      setTimeout(() => {         
        AuthenticationService.login(login.value)
          .then((response) => {
            if (response.err_status) {
              toast.error(`Ocorreu um erro: ${ response.message }`)
              return
            }
              
            localStorage.setItem("__chave_usuario", response.token)
            const user: User = VueJwtDecode.decode(response.token)
            store.setUser(user)
            toast.success("Usuário logado")
            router.push({ name: 'home' })
          })
      }, timer)
    }

    return {
      login,
      img,
      signIn,
      handleEmail,
      handlePassword,
      inputError
    }    
  },
})
</script>

