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
        <button type="submit" @click.prevent="signIn">
        <span>Entrar</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, computed, ComputedRef } from 'vue'
import { useRouter } from 'vue-router'
import { Login, InputError } from "@/types/index"
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
    const inputError: Ref<InputError>  = ref({ inputType: undefined, messageError: undefined })
    const img: ComputedRef<string> = computed(() => require("@/assets/imgs/logo.png"))
    const toast: any  = useToast()
    const router: any = useRouter()
    
    /**
     * Função que recebe o valor emitido pelo input e carrega o 
     * atributo email dentro do objeto Login
     * @param {string} email valor de email recebido via emit
     */
    function handleEmail (email: string) : void {
      login.value.email = email
    }

    /**
     * Função que recebe o valor emitido pelo input e carrega o
     * atributo password dentro do objeto Login
     * @param {string} password - valor de senha recebido via emit
     */
    function handlePassword (password: string) {
      login.value.password = password
    }

    /**
     * Função que verifica se um dos atrinutos de Login é uma
     * string vazia, e retorna um valor booleano
     * @param {Login} login - {email: string, password: string}
     * @returns {boolean} boolean
     */
    function hasLogin (login: Login) : boolean {
      if (login.email == "" && login.password == "") {
        inputError.value = {inputType: ['email', 'password'], messageError: 'Campos não podem ficar vazios'}
        return false
      }

      if (login.email == "") {
        inputError.value = {inputType: ['email'], messageError: 'Campo e-mail não pode ficar vazio'}
        return false
      }

      if (login.password == "") {
        inputError.value = {inputType: ['password'], messageError: 'Campo password não pode ficar vazio'}
        return false
      }  
      
      if (!login.email || !login.password) 
        return false
        
      return true
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
      handlePassword,
      inputError
    }    
  },
})
</script>

