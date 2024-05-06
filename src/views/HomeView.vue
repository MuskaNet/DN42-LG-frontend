<template>
  <h2>Protocols View</h2>
  <el-skeleton v-if="!loaded" :rows="5" animated />
  <Suspense v-else>
    <template #default>
      <div v-for="result of results" :key="result.server">
        <h3>{{ result.server }}</h3>
        <div class="actions">
          <router-link :to="`/detail/${result.server}`"><el-button type="primary">Detail</el-button></router-link>
          <router-link :to="`/route/${result.server}`"><el-button>Route</el-button></router-link>
        </div>
        <el-table :data="result.data" :row-class-name="tableRowClassName" style="width: 100%">
          <el-table-column prop="name" label="Name" />
          <el-table-column prop="protocol" label="Protocol" />
          <el-table-column prop="table" label="Table" />
          <el-table-column prop="state" label="State" />
          <el-table-column prop="since" label="Since" />
          <el-table-column prop="message" label="Message" />
          <el-table-column fixed="right" label="More" width="120">
            <template #default="scope">
              <el-button link type="primary" size="small" @click="
                //@ts-ignore
                router.push(`/detail/${result.server}/${result.data[scope.$index].name}`)
                ">
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
import { ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import Api from '@/scripts/api'

const router = useRouter()

let loaded = ref(false)
const results: Ref<any> = ref([])

interface SingleData {
  name: string
  protocol: string
  table: string
  state: string
  since: string
  message: string
}

const tableRowClassName = ({ row }: { row: SingleData }) => {
  //console.log(row)
  if (row.state == 'down') {
    //console.log(row.state)
    return 'error-row'
  } else if (row.state == 'start') {
    //console.log(row.state)
    return 'warning-row'
  } else if (row.state == 'up' && row.protocol == 'BGP') {
    //console.log(row.state)
    return 'success-row'
  }
  return ''
}

  ; (async () => {
    const serverListRes = await Api.getServerList()
    const serverList = serverListRes.data.result.map((element: any) => element.server)
    const birdShowProtocols = await Api.executeBird(serverList, 'show protocols')
    for (const result of birdShowProtocols.data.result) {
      buildTableData(result)
    }
    loaded.value = true
  })()

function buildTableData(result: any) {
  const data = []
  const arr = result.data.split('\n').slice(1)
  arr.pop()
  for (const element of arr) {
    const singleData = {
      name: '',
      protocol: '',
      table: '',
      state: '',
      since: '',
      message: ''
    }
    const singleDataArr = element.replace(/\s+/gi, ' ').split(' ')
    singleData.name = singleDataArr[0]
    singleData.protocol = singleDataArr[1]
    singleData.table = singleDataArr[2]
    singleData.state = singleDataArr[3]
    singleData.since = singleDataArr[4]
    singleData.message = singleDataArr[5]
    data.push(singleData)
  }
  //@ts-ignore
  results.value.push({ server: result.server, data: data })
}
</script>

<style scoped>
h2,
h3 {
  margin: 1rem 0;
}

.actions .el-button {
  margin: 0.6rem 0.4rem 1rem 0;
}
</style>
<style>
.error-row {
  --el-table-tr-bg-color: var(--el-color-error-light-9) !important;
}

.warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9) !important;
}

.success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9) !important;
}
</style>
