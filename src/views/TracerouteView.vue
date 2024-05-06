<script setup>
import { ref } from 'vue'
import Api from '@/scripts/api'
import { useRoute } from 'vue-router';

const route = useRoute()

const server = route.params.server
const address = route.params.address

let loaded = ref(false)
let detail = ref('')

    ; (async () => {
        /*@ts-ignore*/
        const req_result = await Api.traceroute([server], address)
        // console.log(req_result)
        detail.value = req_result.data.result[0].data
        loaded.value = true
    })()
</script>

<template>
    <h2>Traceroute: {{ address }}</h2>
    <div style="margin-top: 1rem">
        <el-skeleton v-if="!loaded" :rows="5" animated />
        <Suspense v-else>
            <template #default>
                <pre>{{ detail }}</pre>
            </template>
        </Suspense>
    </div>
</template>