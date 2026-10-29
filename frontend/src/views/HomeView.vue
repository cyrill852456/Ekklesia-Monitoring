<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import { onMounted, ref } from 'vue'
import { getApiHealth } from '../services/api'

const status = ref('Checking API connection…')
const checking = ref(false)

async function checkConnection() {
  checking.value = true
  status.value = 'Checking API connection…'
  try {
    const data = await getApiHealth({ signal: AbortSignal.timeout(10000) })
    if (data?.status !== 'ok') throw new Error('Unexpected API health response.')
    status.value = data.message
  } catch {
    status.value = 'Unable to connect to the API. Check that the Laravel server is running.'
  } finally {
    checking.value = false
  }
}

onMounted(checkConnection)
</script>

<template>
  <main>
    <section aria-label="API connection">
      <p role="status">{{ status }}</p>
      <button type="button" :disabled="checking" @click="checkConnection">
        {{ checking ? 'Checking…' : 'Check connection' }}
      </button>
    </section>
    <TheWelcome />
  </main>
</template>
