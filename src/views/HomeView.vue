<template>
  <h2>Protocols View</h2>
  <el-skeleton v-if="!loaded" :rows="5" animated />
  <Suspense v-else>
    <template #default>
      <div v-for="result of results" :key="result.server">
        <h3>{{ result.server }}</h3>
        <el-table :data="result.data" style="width: 100%">
          <el-table-column prop="name" label="Name" />
          <el-table-column prop="protocol" label="Protocol" />
          <el-table-column prop="table" label="Table" />
          <el-table-column prop="state" label="State" />
          <el-table-column prop="since" label="Since" />
          <el-table-column fixed="right" label="More" width="120">
            <template #default="scope">
              <el-button
                link
                type="primary"
                size="small"
                @click="
                  console.log(result)
                  router.push(`/detail/${result.server}/${result.data[scope.$index].name}`)
                "
              >
                Detail
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Api from '@/scripts/api'

const router = useRouter()

let loaded = ref(false)
const results = ref([])

;(async () => {
  const serverListRes = await Api.getServerList()
  const serverList = serverListRes.data.result.map((element) => element.server)
  const birdShowProtocols = await Api.executeBird(serverList, 'show protocols')
  for (const result of birdShowProtocols.data.result) {
    buildTableData(result)
  }
  loaded.value = true
})()

function buildTableData(result) {
  const data = []
  const arr = result.data.split('\n').slice(1)
  arr.pop()
  for (const element of arr) {
    const singleData = {}
    const singleDataArr = element.replace(/\s+/gi, ' ').split(' ')
    singleData.name = singleDataArr[0]
    singleData.protocol = singleDataArr[1]
    singleData.table = singleDataArr[2]
    singleData.state = singleDataArr[3]
    singleData.since = singleDataArr[4]
    data.push(singleData)
  }
  results.value.push({ server: result.server, data: data })
}
</script>

<style scoped>
h2,
h3 {
  margin: 1rem 0;
}
</style>
