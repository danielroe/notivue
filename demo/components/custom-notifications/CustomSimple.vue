<script setup lang="ts">
import type { NotivueItem } from 'notivue'
import type { CustomSimpleProps } from '../nav/NavPushCustom.vue'

defineProps<{
   item: NotivueItem<CustomSimpleProps>
}>()
</script>

<template>
   <div class="Notification">
      <p :role="item.ariaRole" :aria-live="item.ariaLive">
         {{ item.message }}
      </p>

      <button @click="item.clear" aria-label="Dismiss" tabindex="-1" class="CloseButton">
         <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
         >
            <path
               fill-rule="evenodd"
               d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
            />
         </svg>
      </button>
   </div>
</template>

<style scoped>
.Notification {
   border-radius: 9999px;
   display: flex;
   align-items: center;
   padding-left: 1rem;
   background-color: #455162;
   color: #f9fafb;
   font-size: 0.875rem;
   max-width: 100%;
   user-select: none;
}

.CloseButton {
   padding: 0;
   padding: 0.5rem;
   transition: color 150ms ease-out;
   background: none;
   display: flex;
   border: none;
   color: #ffffffd4;
   cursor: pointer;

   &:hover {
      color: #f9fafb;
   }

   & svg {
      width: 1.25rem;
      height: 1.25rem;
   }
}
</style>
