<template>
    <header>
        <figure>
            <img :src="img" alt="Logo" />
        </figure>

        <div class="dropdown-wrapper" v-click-outside="handleClickOutside">
            <button 
                :class="{'active': isActive}"
                @click="toggleDropDown(!isActive)">
                {{ userInitialLetter }}
            </button>
            <gtg-dropdown 
                :element-style-position="{ 'right': 0, 'top': 43 }"
                :dropdownItems="dropdownItems"
                :isVisible="isActive"/>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed, ComputedRef, PropType } from 'vue'
import GtgDropdown from '../shared/GTG-Dropdown.vue'
import { User, DropDownItem } from '@/types/index'
import store from "@/store/index"
import { useRouter } from 'vue-router'
import { useToast } from "vue-toastification"

interface Props {
    user?: User
}

interface SetupReturn {
    img: ComputedRef<string>,
    userInitialLetter: ComputedRef<string>,
    dropdownItems: Ref<Array<DropDownItem>>,
    isActive: Ref<boolean>,
    toggleDropDown: (value: boolean) => void,
    logout: () => void,
    handleClickOutside: () => void
}

export default defineComponent({
    components: {
        GtgDropdown
    },
    props: {
        user: {
            type: Object as PropType<User>
        }
    },
    setup(props: Props) : SetupReturn {
        const img: ComputedRef<string> = computed(() => require("@/assets/imgs/logo.png"))
        const userInitialLetter: ComputedRef<string> = computed(() => props.user ? props.user?.name.charAt(0) : '');
        const dropdownItems: Ref<Array<DropDownItem>> = ref([{label: 'Sair', callbackFunction: logout}])
        const isActive: Ref<boolean> = ref(false)
        const toast: any  = useToast()
        const router: any = useRouter()

        /** Função que alterna a exibição do dropdown de informações do usuário
         * @param {boolean} value - estado do botão clicado
         */
        function toggleDropDown (value: boolean) : void {
            isActive.value = value;
        }

        /** Função que fecha o dropdown caso ocorra um click fora da área do container */
        function handleClickOutside () : void {
            isActive.value = false;
        }

        /**
         * Função que deleta o token do usuário em localStorage, reseta os dados de 
         * usuário no store do vuex e redireciona para a página de autenticação
         */
        function logout () : void {
            localStorage.removeItem("__chave_usuario");
            store.setUser(null)
            router.push({ name: 'auth' })
            toast.success("Sessão encerrada")
        }

        return {
            img,
            userInitialLetter,
            dropdownItems,
            isActive,
            toggleDropDown,
            logout,
            handleClickOutside
        }
    }
})
</script>
