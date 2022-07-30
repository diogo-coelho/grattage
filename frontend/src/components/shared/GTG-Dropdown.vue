<template>
    <ul class="dropdown-container" :class="{'active': isVisible }"
                :style="{
                    'right': elementStylePosition?.right + 'px' ?? '0px',
                    'left': elementStylePosition?.left + 'px' ?? '0px',
                    'top': elementStylePosition?.top + 'px' ?? '0px',
                    'bottom': elementStylePosition?.bottom + 'px' ?? '0px'
                }">
        <li v-for="(dropdownItem, i) of dropdownItems" 
            :key="`dropdown-item-${i}`"
            @click="dropdownItem.callbackFunction">
            {{ dropdownItem.label }} 
        </li>
    </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ElementStylePosition, DropDownItem } from "@/types/index"

export default defineComponent({
    props: {
        elementStylePosition: {
            type: Object as PropType<ElementStylePosition>
        },
        dropdownItems: {
            type: Object as PropType<Array<DropDownItem>>,
            required: true
        },
        isVisible: {
            type: Boolean,
            default: false
        }
    }

})
</script>

<style>

</style>