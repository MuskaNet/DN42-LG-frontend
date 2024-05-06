<script setup lang="ts">
import { ref } from 'vue'
import config from '@/config'

import { Position } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const router = useRouter()

let drawer = ref(false)
let whois_input = ref('')
let traceroute_input = ref('')
let traceroute_server_input = ref('')

function whois(value: string) {
    router.push(`/whois/${value}`)
    drawer.value = false
}
function traceroute(server: string, address: string) {
    router.push(`/traceroute/${server}/${address}`)
    drawer.value = false
}
</script>

<template>
    <router-link style="color: white; text-decoration: none" to="/">
        <el-avatar style="margin-right: 0.6rem; transform: translateY(5px)" shape="square" :size="28"
            :src="config.site.icon"></el-avatar>
        <el-text style="display: inline;" truncated>
            <h1 style="display: inline">{{ config.site.title }}</h1>
        </el-text>
    </router-link>
    <el-button class="toolbox-btn" style="height: 2.6rem;width: 2.6rem; float: right;transform: translateY(-1px)"
        @click="drawer = true">
        <el-icon size="20">
            <Position />
        </el-icon>
    </el-button>
    <el-drawer v-model="drawer" title="Toolbox" :with-header="false">
        <div class="tool">
            <h3>Whois</h3>
            <el-input v-model="whois_input" style="width: 240px" placeholder="Please input" />
            <el-button @click="whois(whois_input)">Go</el-button>
        </div>
        <div class="tool">
            <h3>Traceroute</h3>
            <el-text>Server:</el-text>
            <br />
            <el-input v-model="traceroute_server_input" style="width: 240px" placeholder="Please input" />
            <br />
            <el-text>Address:</el-text>
            <br />
            <el-input v-model="traceroute_input" style="width: 240px" placeholder="Please input" />
            <el-button @click="traceroute(traceroute_server_input, traceroute_input)">Go</el-button>
        </div>
    </el-drawer>
    <el-divider style="margin-top: 0.6rem" />
    <!-- <el-menu-item index="1"></el-menu-item> -->
</template>

<style scoped>
@media screen and (max-width: 600px) {
    .toolbox-btn {
        z-index: 50;
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        background-color: rgba(54, 53, 53, 0.568);
    }
}

.tool h3,
.tool .el-input,
.el-button {
    margin-bottom: 0.5rem;
}

.tool .el-button {
    margin-left: 0.3rem;
}
</style>