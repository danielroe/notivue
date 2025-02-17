<script setup lang="ts">
const push = usePush()
const config = useNotivue()
const { queue } = useNotifications()

const { state, actions } = useStore()

const enqueuedLength = computed(() => queue.value.length)

function togglePauseOnHover() {
   state.rtl = false
   config.pauseOnHover.value = !config.pauseOnHover.value

   push.info({
      title: `Pause on hover ${config.pauseOnHover.value ? 'enabled' : 'disabled'}`,
      message: config.pauseOnHover.value
         ? 'Notifications will be paused on hover.'
         : 'Notifications will not be paused on hover.',
   })
}

function togglePauseOnTouch() {
   if (state.rtl) actions.toggleRTL()

   config.pauseOnTouch.value = !config.pauseOnTouch.value

   push.info({
      title: `Pause on touch ${config.pauseOnTouch.value ? 'enabled' : 'disabled'}`,
      message: config.pauseOnTouch.value
         ? 'Notifications will be paused on touch.'
         : 'Notifications will not be paused on touch.',
   })
}

function toggleQueue() {
   if (state.rtl) actions.toggleRTL()
   config.enqueue.value = !config.enqueue.value
}

watch(
   () => !config.pauseOnHover.value && state.enableSwipe,
   (isPauseOnHoverDisabled) => {
      if (isPauseOnHoverDisabled) {
         state.enableSwipe = false
      }
   }
)

watch(
   () => state.enableSwipe,
   (isEnabled) => {
      if (state.rtl) actions.toggleRTL()

      push.info({
         title: `Swipe to clear ${isEnabled ? 'enabled' : 'disabled'}`,
         message: isEnabled
            ? 'Swipe left or right on a notification to clear it.'
            : 'Enable it again to use it.',
      })
   }
)

watch(
   () => config.limit.value,
   () => {
      if (state.rtl) actions.toggleRTL()
   }
)

const queueTooltipMessage = computed(() => {
   if (config.limit.value === Infinity) {
      const action = config.enqueue.value ? 'use' : 'enable'
      return `To ${action} this feature, select a limit below.`
   }
   return config.enqueue.value ? 'Deactivate the queue' : 'Activate the queue'
})

const isEnqueueDisabled = computed(() => config.limit.value === Infinity)
const isSwipeDisabled = computed(() => !config.pauseOnHover.value)
</script>

<template>
   <div class="Controls">
      <!-- Disabled must be toggled as a string (and not boolean), Nuxt bug? -->

      <button
         v-if="isDesktop"
         class="ButtonBase SwitchButton"
         role="switch"
         :aria-checked="config.pauseOnHover.value"
         @click="togglePauseOnHover"
      >
         Pause on Hover
      </button>

      <button
         v-else
         class="ButtonBase SwitchButton"
         role="switch"
         :aria-checked="config.pauseOnTouch.value"
         @click="togglePauseOnTouch"
      >
         Pause on Touch
      </button>

      <button
         class="ButtonBase SwitchButton"
         :disabled="isSwipeDisabled"
         role="switch"
         :aria-checked="state.enableSwipe"
         @click="actions.toggleSwipe"
      >
         Clear on Swipe
      </button>

      <VTooltip>
         <button
            class="ButtonBase SwitchButton ButtonTooltip"
            role="switch"
            :aria-checked="config.enqueue.value"
            @click="toggleQueue"
            :disabled="isEnqueueDisabled"
         >
            Enqueue ({{ enqueuedLength }})
         </button>

         <template #popper placement="left">
            {{ queueTooltipMessage }}
         </template>
      </VTooltip>

      <hr />

      <select class="ButtonBase Select" v-model="config.limit.value" aria-label="Limit">
         <option selected :value="Infinity">No Limit</option>
         <option :value="1">Limit - 1</option>
         <option :value="3">Limit - 3</option>
         <option :value="5">Limit - 5</option>
         <option :value="10">Limit - 10</option>
      </select>
   </div>
</template>

<style scoped>
.Controls {
   display: grid;
   gap: 10px;
   grid-auto-flow: row;
}

.Select {
   text-align: center;
   display: flex;
   justify-items: center;

   -webkit-appearance: none;
   appearance: none;

   background-image: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
   background-position: right 0.45em top 50%;
   background-repeat: no-repeat;
   background-size: auto 1rem;
}

.ButtonTooltip {
   width: 100%;
}

hr {
   margin: 0.25rem 0;
   border: 0;
   border-bottom: 1px solid var(--divider-color);
}
</style>

<style>
.v-popper__wrapper {
   max-width: 160px;
}

.v-popper__inner {
   background: var(--button-bg-color) !important;
   color: var(--button-color) !important;
   font-size: 0.825rem !important;
   line-height: 1.35;
}

.v-popper__arrow-outer {
   border-color: var(--button-bg-color) !important;
}
</style>
