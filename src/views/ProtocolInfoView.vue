<template>
  <h2>Protocol Details: {{ protocol ?? 'all' }}</h2>
  <el-text>Server: {{ server }}</el-text>
  <div style="margin-top: 1rem">
    <el-skeleton v-if="!loaded" :rows="5" animated />
    <Suspense v-else>
      <template #default>
        <pre>{{ detail }}</pre>
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import Api from '@/scripts/api'

const route = useRoute()

const server = route.params.server
const protocol = route.params.protocol

let loaded = ref(false)
let command = 'show protocols '
let detail = ref('')

if (protocol == null) {
  command += 'all'
} else {
  command += `all ${protocol}`
}

;(async () => {
  const req_result = await Api.executeBird([server], command)
  // console.log(req_result)
  detail.value = req_result.data.result[0].data
  loaded.value = true
})()
</script>
